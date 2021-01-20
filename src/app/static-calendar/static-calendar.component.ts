import { Component, Input, OnInit } from '@angular/core';
import { CollectionSettings, getMonthCode } from '../types';
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

  mode: string = null;

  constructor() {

  }

  ngOnInit() {
    this.settings.subscribe((data: CollectionSettings) => {
      console.log(data);
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
      this.timetableObject = data;
    })
  }
  configureCustomDatesMode(data: CollectionSettings){
    /// We need to generate the rows and cols of our calendar
    var days: string[] = getDaysBetween(data.startDate, data.endDate);
    
    this.cols = [];
    for (var day of days){
      this.cols.push(day);
    }
    this.rows = [];
    for (var hour = data.startHour; hour < data.endHour;hour += 1){
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

  timeAvailable(val: string) : boolean{
    return !this.timetableObject[val];
  }
  // we need this function to make it accesible from html
  convertToTinyFormat(val: string, mode: string){ 
    return convertToTinyFormat(val, mode);
  }
  getMonthCode(col: string){
    return getMonthCode(col);
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
