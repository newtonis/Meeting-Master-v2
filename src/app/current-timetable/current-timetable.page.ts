import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionSettings, Person } from '../types';
import { DbService } from '../db.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService } from '../auth.service';
import { mergeTimetables } from '../types';

@Component({
  selector: 'app-current-timetable',
  templateUrl: './current-timetable.page.html',
  styleUrls: ['./current-timetable.page.scss'],
})
export class CurrentTimetablePage implements OnInit {

  calendarSettings: Observable<CollectionSettings>;
  peopleObservable: Observable<Person[]>;
  selectedPeople: {[id: string] : boolean} = {};
  people: Person[];

  timetable: Observable<{[id:string]:boolean}>;
  constructor(private dbService: DbService, private authService: AuthService) { 
    //this.dbService.setCollectionName()
    this.calendarSettings = this.dbService.getCollectionSettings();
    //this.testTimetable = of({});
    
    this.peopleObservable = this.dbService.getUsersData();

    /*this.timetable = this.peopleObservable.pipe(map(
      (people: Person[]) => mergeTimetables(people, this.selectedPeople)
    ));*/

    /*this.authService.getSelectedPeople().subscribe((selected: {[id: string] : boolean}) => {
      this.selectedPeople = selected;
    })*/
    this.peopleObservable.subscribe((people: Person[]) => {
      this.people = people;
      this.authService.refreshPeople();
    });

    this.timetable = this.authService.getSelectedPeople().pipe(map(
      (selected: {[id: string] : boolean} ) => {
        return mergeTimetables(this.people, selected);
      }
    ));
    
  }

  ngOnInit() {
    
  }
  ionViewDidEnter() {

  }
}
