import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CollectionSettings } from '../types';
import { DbService } from '../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';

@Component({
  selector: 'app-select-your-timetable',
  templateUrl: './select-your-timetable.page.html',
  styleUrls: ['./select-your-timetable.page.scss'],
})
export class SelectYourTimetablePage implements OnInit {

  calendarSettings: Observable<CollectionSettings>;
  testTimetable: Observable<{[id:string]:boolean}>;
  id: string;
  lastSlide: boolean = false;
  pages: number = null;
  currentPage: number = null;
  


  constructor(private dbService: DbService, private router: Router, private route: ActivatedRoute) { 
    this.dbService.loadCollection("ExampleTimetable", false);
    this.calendarSettings = this.dbService.getCollectionSettings();
    this.id = this.route.snapshot.paramMap.get('id');

    this.testTimetable = of({"2020-01-01T00":true,"2020-01-01T05":true});
    
    

  }
  ngOnInit() {

  }
  pageUpdated(value: number){
    this.currentPage = value;
    if (this.pages != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    console.log(this.currentPage, this.pages);
  }
  numberOfPagesUpdated(value: number){
    console.log("number of pages = " + value);
    this.pages = value;
    if (this.currentPage != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    console.log(this.currentPage, this.pages);
  }

  save(){
    console.log(this.id);
    this.router.navigateByUrl(`/meeting/${this.id}`);
  }

  goBack(){
    this.router.navigateByUrl("/select-use-mode");
  }
}
