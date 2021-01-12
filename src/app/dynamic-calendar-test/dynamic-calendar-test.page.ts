import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CollectionSettings } from '../types';
import { DbService } from '../db.service';

@Component({
  selector: 'app-dynamic-calendar-test',
  templateUrl: './dynamic-calendar-test.page.html',
  styleUrls: ['./dynamic-calendar-test.page.scss'],
})
export class DynamicCalendarTestPage implements OnInit {

  calendarSettings: Observable<CollectionSettings>;
  testTimetable: Observable<{[id:string]:boolean}>;
  constructor(private dbService: DbService) { 
    this.dbService.loadCollection("ExampleTimetable", false);
    this.calendarSettings = this.dbService.getCollectionSettings();

    this.testTimetable = of({"2020-01-01T00":true,"2020-01-01T05":true});
  }
  ngOnInit() {
  }

}
