import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Input, Output } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() personData: Observable<Person[]>; // all persons
  @Output() personOutput: Observable< {[id: string]: boolean;} >; // selected persons in list

  personSubject: BehaviorSubject<{[id: string]: boolean;}> = new BehaviorSubject({});
  dataSelected: {[id: string]: boolean} = {};

  constructor() {
    this.personOutput = this.personSubject.asObservable();
  }

  ngOnInit() {
    // to check new data
    this.personData.subscribe(data => {
 
    });
  }
  ionChange(checked: boolean, person : Person){
    this.dataSelected[person.id] = checked;
    this.personSubject.next(this.dataSelected); // we updated selected names
  }
}
