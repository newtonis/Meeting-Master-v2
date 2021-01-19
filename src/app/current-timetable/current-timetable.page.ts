import { Component, OnInit } from '@angular/core';
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
  calendarSettingsSubj: BehaviorSubject<CollectionSettings> = new BehaviorSubject(null);
  peopleObservable: Observable<Person[]>;
  selectedPeople: {[id: string] : boolean} = {};

  timetable: Observable<{[id:string]:boolean}>;
  constructor(private dbService: DbService, private authService: AuthService) { 
    console.log("load collection");
    //this.dbService.setCollectionName()
    this.calendarSettings = this.calendarSettingsSubj.asObservable();
    
    //this.testTimetable = of({});
    
    this.peopleObservable = this.dbService.getUsersData();

    this.timetable = this.peopleObservable.pipe(map(
      (people: Person[]) => mergeTimetables(people, this.selectedPeople)
    ));

    this.authService.getSelectedPeople().subscribe((selected: {[id: string] : boolean}) => {
      this.selectedPeople = selected;
    })
    
  }

  ngOnInit() {
    
  }
  ionViewDidEnter() {
    this.dbService.loadCollection(this.authService.getMeetingId(), false).then(collectionData =>{
      this.calendarSettingsSubj.next(collectionData);
    });
    this.dbService.requestUserData(this.authService.getMeetingId());
  }
}
