import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Person, YearDay, getDaysBetween, CollectionSettings,createCollectionSettingsDateMode, createCollectionSettingsWeekMode, createVoidCollectionSettings, UserData, generateUserData, createPerson, createUserData } from './types';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'events';
import { promise } from 'protractor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  collectionSettings: CollectionSettings = null;

  collectionLoaded: boolean = false;
  usersDataSubscription: Subscription = null;

  peopleSubj: BehaviorSubject<Person[]> = new BehaviorSubject([]); 
  
  subscriptionCollection: Subscription = null;
  collectionSettingsSubject: BehaviorSubject<CollectionSettings> = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService) { 
    
  }

  /* 
    loadCollection(collectionName)

    select a collection with corresponding user data
  */

  loadCollection(collectionName : string, loadUsersData: boolean = true) : Promise<any>{ // select a new Collection
    var resolves;
    var rejects;
    const emitter = new EventEmitter();
    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });
    
    if (this.subscriptionCollection){
      this.subscriptionCollection.unsubscribe();
    }
    // we need to request the collection data
    this.subscriptionCollection = this.afs.collection(collectionName).doc("settings").get().subscribe(data =>{
      if (!data.exists){
        this.authService.meetingId = null;
        resolves(createVoidCollectionSettings());
      }else{

        if (data.data()["mode"] == "date"){
          resolves(
            createCollectionSettingsDateMode(
              data.data()["id"],
              data.data["owner"],
              data.data()["startDate"],
              data.data()["endDate"],
              data.data()["startHour"],
              data.data()["endHour"]
            )
          );
        }else if(data.data()["mode"] == "week"){
          resolves(
            createCollectionSettingsWeekMode(
              data.data()["id"],
              data.data()["owner"],
              data.data()["startHour"],
              data.data()["endHour"],
              data.data()["weekdays"]
            )
          );
        }

        /*if (loadUsersData){
          this.requestUserData();
        }*/
      }
    });
    return promise;

  }

  /* 
    requestUserData()

    request db all users of the collection loaded the data
  */
 
  requestUserData(collectionName: string) : void{
    console.log("request user data "+ collectionName);
    if (this.usersDataSubscription){
      this.usersDataSubscription.unsubscribe();
    }
    this.usersDataSubscription = this.afs.collection(collectionName).valueChanges().subscribe(data => {
      var people : Person[] = [];
      console.log(data);
      for (const docName in data){ // for each user in db
      
        if (data[docName]["id"] != 'settings'){
          var doc = data[docName];
          var newPerson : Person = createPerson(
            createUserData(
              doc["id"],
              doc["name"],
              doc["email"],
              doc["image_url"]
            ),
            doc["timetable"]
          )

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

      this.peopleSubj.next(people);
      
    });
  }

  
  /*
    getUsersData()

    request observable with all users data
  */
 
  getUsersData() : Observable<Person[]>{
    return this.peopleSubj.asObservable();
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
    console.log("creating Meeting ");
    console.log(settings);

    if (settings.id == ""){
      rejects("Name is void");
    }

    this.afs.collection(settings.id).doc("settings").get().subscribe(data =>{
      if (!data.exists){
        this.afs.collection(settings.id).doc("settings").set(settings)
        .then( msg => {
          resolves(msg);
        }).catch( err => {
          rejects(err);
        })
      }else{
        rejects("The name " + settings.id + " is already taken");
      }
    })

    return promise;
  }
  /*
  hasUserSetTimetable
    check if user has set his/her timetable
  */
  hasUserSetTimetable(collection: string) : Promise<any>{
    
    var resolves;
    var rejects;
    const emitter = new EventEmitter();
    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });

    this.afAuth.authState.subscribe((user : firebase.User) => {
      if (user != null){
        this.afs.collection(collection).doc(user.uid).get().subscribe(data => {
          if (!data.exists){
            resolves(false); 
          }else{
            rejects(true);
          }
        })
      }else{
        resolves(false);
      }
    });
    
    return promise;
  }

  /*
    setUserTimetable(collection: string, data: string[]);
  
    set user schedule data
  */

  setUserTimetable(collection: string, person: Person, user: UserData){

    var resolves;
    var rejects;
    const emitter = new EventEmitter();
    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });


    this.afs.collection(collection).doc(user.id).set(person).then(
      data => {
        resolves("User data succesfuly updated");
      }
    ).catch(msg=>{
      rejects("error " + msg);
    });
      

    return promise;
  }

  /* 
    request timetable from specific user
  
    requestUserTimetable(collection: string, user: UserData)
  
    */

   requestUserTimetable(collection: string, user: UserData) : Promise<any>{
      
    var resolves;
      var rejects;
      const emitter = new EventEmitter();
      const promise = new Promise((resolve, reject) => {
        resolves = resolve;
        rejects = reject;
      });

      this.afs.collection(collection).doc(user.id).get().subscribe(
        data => {
          if (data.exists){
            resolves(createPerson(
              user,
              data.data()["timetable"]
            ))
          }else{
            resolves(createPerson(user,{}));
          }
        }
      );

      return promise;

   }
}

