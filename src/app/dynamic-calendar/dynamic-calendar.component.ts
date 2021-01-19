import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Inject  } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CollectionSettings } from '../types';
import { getDaysBetween, convertToTinyFormat, convertToTinyHours } from '../types';
import { DOCUMENT } from '@angular/common'; 
import { AuthService } from '../auth.service';
import { getMonthCode } from '../types';

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


   // timetable to send changes outside
  @ViewChild('mySlider') slider : IonSlides;

  
  @Output() pageUpdated: EventEmitter<number> = new EventEmitter();
  @Output() numberOfPagesUpdated: EventEmitter<number> = new EventEmitter();
  @Output() outputTimetable: EventEmitter<{[id:string]:boolean}> = new EventEmitter();

  isBottom: boolean = false;

  @Output() scrollBottom: EventEmitter<boolean> = new EventEmitter();
  
  page: number = 0;

  rows: string[] = [];
  cols: string[] = [];
  
  calendarSlides: CalendarSlide[] = [];
  daysPerSlide: number = 7;

  subscription: Subscription = null;
  firstTime: boolean = false;
  mode: string = null;

  constructor(@Inject(DOCUMENT) document, private authService: AuthService) { 
    
  }
  ngOnInit(){
    
    //console.log("dynamic calendar ng on init");
    this.slider = ViewChild('mySlider');
    
    this.settings.subscribe((data: CollectionSettings) => {
      console.log("Data from collection is here");
      if (data != null){
        /// We need to generate the rows and cols of our calendar

        if (data.mode == "date"){
          this.mode = "date";
          this.configureCustomDatesMode(data);
        }else if(data.mode == "week"){
          this.mode = "week";
          this.configureWeekMode(data);
        }
      }
    });
    this.timetable.subscribe( data => {
      this.timetableLocal = data;
      this.outputTimetable.emit(this.timetableLocal);
    })

  }
  configureCustomDatesMode(data: CollectionSettings){
    var days: string[] = getDaysBetween(data.startDate, data.endDate);
        
    this.cols = [];
    for (var day of days){
      this.cols.push(day);
    }
    
    this.rows = [];
    for (var hour = data.startHour; hour <= data.endHour;hour += 1){
      this.rows.push(convertToTinyHours(hour.toString()));
    }

    this.generateCalendarSlides();
  }

  configureWeekMode(data: CollectionSettings){
    console.log("Configure in week mode:");
    console.log(data);

    var weekdays: {[num: number] : boolean} = {};

    for (let day of data.weekdays){
      weekdays[day] = true;
    }

    this.cols = [];
    for (let day of [1, 2, 3, 4, 5, 6, 7]){
      if (day in weekdays){
        this.cols.push("0" + day.toString());
      }else{
        this.cols.push("voidcol");
      }
    }

    this.rows = [];
    for (var hour = data.startHour; hour <= data.endHour;hour += 1){
      this.rows.push(convertToTinyHours(hour.toString()));
    }
    console.log("cols:");
    console.log(this.cols);
    console.log("rows:");
    console.log(this.rows);
    this.generateCalendarSlides();
  }

  ngAfterViewInit(){
    if (this.subscription){
      this.subscription.unsubscribe();
    }
    this.subscription = this.slider.ionSlideTransitionEnd.subscribe(progress => 
      {
        //console.log("transition end");
        this.slider.getActiveIndex().then( 
          
            (val : number) => {
              this.pageUpdated.emit(val); 
              this.page = val;
              this.scrollChange(this.page, null);
            },
            (error) => console.log(error)

        );
      }
    );
  }
  isOnBottom(){
    var slideElement: Element = document.getElementById("slideElement" + this.page);

    return slideElement.scrollTop == slideElement.scrollHeight - slideElement.clientHeight;
  }
  scrollToBottom(){
    //console.log("slideElement" + this.page)
    if (this.isOnBottom()){
      this.scrollBottom.emit(true);
    }else{
      var slideElement: Element = document.getElementById("slideElement" + this.page);

      //console.log((slideElement.scrollHeight - slideElement.clientHeight).toString() + "px" );
      slideElement.scrollTo({top: slideElement.scrollHeight - slideElement.clientHeight, behavior: 'smooth'});
      
      //slideElement.scrollTop = slideElement.scrollHeight - slideElement.clientHeight;

      this.scrollChange(this.page, null);
    }

  }
  scrollChange(id: number, event: any){
    var lastBottom = this.isBottom;
    this.isBottom = this.isOnBottom();
    //console.log(this.isBottom);
    if (this.firstTime || (lastBottom != this.isBottom)){
      this.firstTime = false;
      this.scrollBottom.emit(this.isBottom);
    }
  }
  detectBottom(id: string){
    //console.log("bottom = " + id);
  }

  click(col: string, row: string){
    //console.log(col, row);
    if (col != "voidcol"){
      if (this.timetableLocal[col + "T"+ row]){
        delete this.timetableLocal[col + "T"+ row];
      }else{
        this.timetableLocal[col + "T"+ row] = true;
      }
      this.outputTimetable.emit(this.timetableLocal);
    }
  }
  timeOccupied(val: string){
    return val in this.timetableLocal;
  }

  // we need this function to make it accesible from html
  convertToTinyFormat(val: string, mode: string){ 
    return convertToTinyFormat(val, mode);
  }
  getMonthCode(col: string){
    return getMonthCode(col);
  }
  nextPage(){
    this.slider.slideNext();
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
    this.page = 0;
    this.numberOfPagesUpdated.emit(slideNumber);

    if (this.slider){
      this.slider.slideTo(0);
      this.scrollBottom.emit(false);
    }

  }
}
