import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionSettings } from '../types';
import { DbService } from '../db.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { of } from 'rxjs';

@Component({
  selector: 'app-static-calendar-test',
  templateUrl: './static-calendar-test.page.html',
  styleUrls: ['./static-calendar-test.page.scss'],
})
export class StaticCalendarTestPage implements OnInit {
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
