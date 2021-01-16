import { Component, OnInit, Input, Output, ViewChild, EventEmitter  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CollectionSettings } from '../types';
import { getDaysBetween, convertToTinyFormat, convertToTinyHours } from '../types';

export interface CalendarSlide{
  cols: string[];
  rows: string[];
  id: number;
}

@Component({
  selector: 'app-dynamic-calendar',
  templateUrl: './dynamic-calendar.component.html',
  styleUrls: ['./dynamic-calendar.component.scss'],
})
export class DynamicCalendarComponent implements OnInit {
  @Input() settings : Observable<CollectionSettings>; // input settings to know how to show dates
  @Input() timetable : Observable<{[id:string]:boolean}>; // input that show which squares to paint

  timetableLocal: {[id: string] : boolean} = {}; // local timetable with local changes

  @Output() outputTimetable: Observable<{[id:string]:boolean}>; // timetable to send changes outside
  @ViewChild('mySlider') slider : IonSlides;

  @Output() pageUpdated: EventEmitter<number> = new EventEmitter();
  @Output() numberOfPagesUpdated: EventEmitter<number> = new EventEmitter();

  rows: string[] = [];
  cols: string[] = [];
  
  calendarSlides: CalendarSlide[] = [];
  daysPerSlide: number = 7;

  subscription: Subscription = null;



  constructor() { 

  }

  ngOnInit() {
    this.settings.subscribe((data: CollectionSettings) => {
      console.log(data);
      if (data != null){
        /// We need to generate the rows and cols of our calendar
        var days: string[] = getDaysBetween(data.startDate, data.endDate);
        
        this.cols = [];
        for (var day of days){
          this.cols.push(day);
        }

        for (var hour = data.startHour; hour < data.endHour;hour += 1){
          this.rows.push(convertToTinyHours(hour.toString()));
        }

        this.generateCalendarSlides();
      }
    });
    this.timetable.subscribe( data => {
      this.timetableLocal = data;
    })


  }

  click(col: string, row: string){
    console.log(this.timetableLocal);
    if (this.timetableLocal[row + "T"+ col]){
      delete this.timetableLocal[row + "T"+ col];
    }else{
      this.timetableLocal[row + "T"+ col] = true;
    }
  }
  timeOccupied(val: string){
    return val in this.timetableLocal;
  }

  // we need this function to make it accesible from html
  convertToTinyFormat(val: string){ 
    return convertToTinyFormat(val);
  }

  generateCalendarSlides(){
    this.calendarSlides = [];

    var slideNumber : number = 0;

    while (slideNumber * this.daysPerSlide < this.cols.length){
      var numberOfRows = Math.min(this.daysPerSlide, this.cols.length - slideNumber * this.daysPerSlide);
      var totalCols = this.cols.slice(slideNumber * this.daysPerSlide, slideNumber * this.daysPerSlide + numberOfRows);
      // we need to add void cols
      while (totalCols.length < this.daysPerSlide){
        totalCols.push("voidcol");
      }
      
      this.calendarSlides.push(
        {
          cols: totalCols,
          rows: this.rows,
          id: slideNumber
        }
      )
      

      slideNumber += 1;
    }
    this.pageUpdated.emit(0);
    this.numberOfPagesUpdated.emit(slideNumber);

    console.log(slideNumber);

    if (this.subscription){
      this.subscription.unsubscribe();
    }
    this.subscription = this.slider.ionSlideTransitionEnd.subscribe(progress => 
      {
        //console.log("transition end");
        this.slider.getActiveIndex().then( 
          
            (val : number) => this.pageUpdated.emit(val),
            (error) => console.log(error)

        );
      }
    );
  }
}
