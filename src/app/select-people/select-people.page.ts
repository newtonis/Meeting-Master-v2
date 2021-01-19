import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { Person } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-people',
  templateUrl: './select-people.page.html',
  styleUrls: ['./select-people.page.scss'],
})
export class SelectPeoplePage implements OnInit {

  peopleData : Observable<Person[]>;
  meeting_id: string = null;
  constructor(private dbService : DbService, private authService: AuthService) {
    this.meeting_id = this.authService.getMeetingId();
    //this.dbService.loadCollection("ExampleTimetable");
    
    
    this.peopleData = this.dbService.getUsersData();
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
  
  }
  updatePeopleSelected(selected : {[id: string]: boolean;}){
    this.authService.updateSelectedPeople(selected); 
  }
}
