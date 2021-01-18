import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { Person } from '../types';

@Component({
  selector: 'app-select-people',
  templateUrl: './select-people.page.html',
  styleUrls: ['./select-people.page.scss'],
})
export class SelectPeoplePage implements OnInit {

  peopleData : Observable<Person[]>;
  
  constructor(private dbService : DbService) {
    this.dbService.loadCollection("ExampleTimetable");
    this.peopleData = this.dbService.getUsersData();
  }
  ngOnInit() {
  }

}
