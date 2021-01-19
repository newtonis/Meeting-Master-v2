
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Inject  } from '@angular/core';
import { Person } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() peopleData: Observable<Person[]>; // all persons
  @Output() peopleSelected: EventEmitter< {[id: string]: boolean;} > = new EventEmitter(); // selected persons in list

  peopleDataSorted: Observable<Person[]>;
  personSubject: BehaviorSubject<{[id: string]: boolean;}> = new BehaviorSubject({});
  dataSelected: {[id: string]: boolean} = {};
  firstTime: boolean = true;

  constructor() {
    
  }

  ngOnInit() {
    this.peopleDataSorted = this.peopleData.pipe(map(
      personOutput => personOutput.sort( (a: Person, b: Person) => {
          if (a.name > b.name){
            return 1;
          }if (b.name > a.name){
            return -1;
          }else{
            return 0;
          }
      })
    ));
    // to check new data
    this.peopleData.subscribe(data => {
      //console.log("new data " + data);
      if (data != null){
        for (let person of data){
          if (!(person.id in this.dataSelected)){
            this.dataSelected[person.id] = true;
          }
        }
        
        ///console.log("data selected");
        //console.log(this.dataSelected);
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
    this.peopleSelected.emit(this.dataSelected); // we updated selected names
  }
}
