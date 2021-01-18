import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Person, YearDay, getDaysBetween, CollectionSettings,createCollectionSettingsDateMode, createCollectionSettingsWeekMode } from './types';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'events';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  collectionName: string = null;
  collectionSettings: CollectionSettings = null;

  collectionLoaded: boolean = false;
  usersDataSubscription: Subscription = null;

  peopleDbData: BehaviorSubject<Person[]> = new BehaviorSubject([]);
  collectionSettingsSubject: BehaviorSubject<CollectionSettings> = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore) { 
    
  }

  /* 
    loadCollection(collectionName)

    select a collection with corresponding user data
  */

  loadCollection(collectionName : string, loadUsersData: boolean = true){ // select a new Collection
    this.collectionName = collectionName;
    this.collectionLoaded = false;
    
    // we need to request the collection data
    this.afs.collection(this.collectionName).doc("settings").get().subscribe(data =>{

      if (data.data()["mode"] == "date"){
        this.collectionSettings = 
          createCollectionSettingsDateMode(
            data.data()["id"],
            data.data["owner"],
            data.data()["startDate"],
            data.data()["endDate"],
            data.data()["startHour"],
            data.data()["endHour"]
          )
      }else if(data.data()["mode"] == "week"){
        this.collectionSettings =
          createCollectionSettingsWeekMode(
            data.data()["id"],
            data.data()["owner"],
            data.data()["startHour"],
            data.data()["endHour"],
            data.data()["weekdays"]
          )
      }

      this.collectionSettingsSubject.next(this.collectionSettings);
      this.collectionLoaded = true;

      if (loadUsersData){
        this.requestUserData();
      }
    });

  }

  /* 
    requestUserData()

    request db all users of the collection loaded the data
  */
 
  requestUserData() : string{
    if (!this.collectionLoaded){
      return "Error: collection is not loaded";
    }else{
      this.usersDataSubscription = this.afs.collection(this.collectionName).valueChanges().subscribe(data => {
        var people : Person[] = [];
        console.log(data);
        for (const docName in data){ // for each user in db
        
          if (data[docName]["id"] != 'settings'){
            var doc = data[docName];
            var newPerson : Person = {
              id: doc["id"],
              name: doc["name"],
              timetable: doc["timetable"]
            };

            people.push(newPerson);
            // This code could be useful but not now
            /*for (const day of getDaysBetween(this.startDate, this.endDate)){ // for each posible day
              for (var hour_id = this.startDate;hour_id < this.endDate;hour_id+=1){
                if (day in data[docName]["timetable"]){ // registered
                  
                }
              }
            }*/
          }
        }

        this.peopleDbData.next(people);
        
      })
      
    }
  }

  /*
    getUsersData()

    request observable with all users data
  */
 
  getUsersData() : Observable<Person[]>{
    return this.peopleDbData.asObservable();
  }

  /*
    getCollectionSettings()

    request collection settings observable
  */

  getCollectionSettings() : Observable<CollectionSettings>{
    return this.collectionSettingsSubject.asObservable();
  }

    /*
    createMeeting()

    create a new meeting, we only validate if the id already exist
  */

  createMeeting(settings: CollectionSettings) : Promise<any>{
    
    var resolves;
    var rejects;
    const emitter = new EventEmitter();
    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });

    this.afs.collection(settings.id).doc("settings").set(settings)
    .then( msg => {
      resolves(msg);
    }).catch( err => {
      rejects(err);
    })

    return promise;
  }
  /*
  hasUserSetTimetable
    check if user has set his/her timetable
  */
  hasUserSetTimetable(uid: string, collection: string) : Promise<any>{
    var resolves;
    var rejects;
    const emitter = new EventEmitter();
    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });

    this.afs.collection(collection).doc(uid).get().subscribe(data => {
      if (data == null){
        resolves(true);
      }else{
        rejects(false);
      }
    })
    
    return promise;
  }
}

