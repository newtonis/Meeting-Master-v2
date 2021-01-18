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
      for (let person of data){
        this.dataSelected[person.id] = true;
      }
    });
  }
  checked(id: string){
    if (id in this.dataSelected){
      if (this.dataSelected[id]  == true){
        return true;
      }
    }
    return false;
  }
  ionChange(event: any, person : Person){
    console.log(person.id, event.target.checked);
    this.dataSelected[person.id] = event.target.checked;
    this.personSubject.next(this.dataSelected); // we updated selected names
  }
}
