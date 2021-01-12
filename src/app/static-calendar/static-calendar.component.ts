import { Component, Input, OnInit } from '@angular/core';
import { CollectionSettings } from '../types';
import { Observable } from 'rxjs';
import { getDaysBetween, convertToTinyFormat, convertToTinyHours } from '../types';

export interface CalendarSlide{
  cols: string[];
  rows: string[];
  id: number;
}

@Component({
  selector: 'app-static-calendar',
  templateUrl: './static-calendar.component.html',
  styleUrls: ['./static-calendar.component.scss'],
})

export class StaticCalendarComponent implements OnInit {
  @Input() settings : Observable<CollectionSettings>; // input settings to know how to show dates
  @Input() timetable : Observable<{[id:string]:boolean}>; // input that show which squares to paint

  timetableObject: {[id:string]:boolean} = {};

  rows: string[] = [];
  cols: string[] = [];
  
  calendarSlides: CalendarSlide[] = [];
  daysPerSlide: number = 7;

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
      this.timetableObject = data;
    })
  }
  timeAvailable(val: string) : boolean{
    return this.timetableObject[val];
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

    console.log(this.calendarSlides);
  }

}