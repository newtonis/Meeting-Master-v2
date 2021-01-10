import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { Person } from '../types';

@Component({
  selector: 'app-name-list-test',
  templateUrl: './name-list-test.page.html',
  styleUrls: ['./name-list-test.page.scss'],
})
export class NameListTestPage implements OnInit {

  peopleData : Observable<Person[]>;
  
  constructor(private dbService : DbService) {
    this.dbService.loadCollection("ExampleTimetable");
    this.peopleData = this.dbService.getUsersData();
  }
  ngOnInit() {
  }

}
