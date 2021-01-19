import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { CollectionSettings, createPerson, generateUserData, Person, UserData } from '../types';
import { DbService } from '../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-select-your-timetable',
  templateUrl: './select-your-timetable.page.html',
  styleUrls: ['./select-your-timetable.page.scss'],
})
export class SelectYourTimetablePage implements OnInit {

  calendarSettings: Observable<CollectionSettings>;
  calendarSettingsSub: BehaviorSubject<CollectionSettings> = new BehaviorSubject(null);
  
  timetableSubj: BehaviorSubject<{[id:string]:boolean}> = new BehaviorSubject({});

  testTimetable: Observable<{[id:string]:boolean}>;
  lastSlide: boolean = false;
  pages: number = null;
  currentPage: number = null;
  isBottom: boolean = false;
  outputTimetable: {[id:string]:boolean};

  loadingUI: HTMLIonLoadingElement = null;

  loginLoaded: boolean = false;
  calendarLoaded: boolean = false;
  dbDataLoaded: boolean = false;

  loaded: boolean = false;
  meetingId: string;

  @ViewChild('myCalendar') myCalendar: DynamicCalendarComponent;
  userData: UserData = null;

  constructor(
    private dbService: DbService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastController: ToastController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private auth: AuthService) {
      this.meetingId = this.route.snapshot.paramMap.get('id');
      //this.dbService.setCollectionName(this.meetingId);
      //this.dbService.loadCollection(this.meetingId, false);
     // this.calendarSettings = this.dbService.getCollectionSettings();
      this.calendarSettings = this.calendarSettingsSub.asObservable();

      this.testTimetable = this.timetableSubj.asObservable();

      /// update from calendar
      
  }
  ngOnInit(){
    //this.meetingId = this.route.snapshot.paramMap.get('id');
    //this.dbService.setCollectionName(this.meetingId);
    
  }
  ionViewDidEnter() {
    //this.myCalendar.startDynamicCalendar();
    console.log("meeting id = " + this.meetingId);
    this.dbService.loadCollection(this.meetingId, false).then((data: CollectionSettings) => {
      
      if (data != null){
        this.calendarLoaded = true;
        this.calendarSettingsSub.next(data);
        this.checkEndLoad();
        console.log("calendar settings");
        console.log(data);

        if (data.mode == "not found"){
          this.router.navigateByUrl("/select-use-mode");
        }
      }
    }).catch(err => {
      console.log("error: " + err);
    });

    this.setLoading();


    this.afAuth.authState.subscribe(user => {
      this.loginLoaded = true;
      this.checkEndLoad();

      if (user == null){ // not logged in  
        this.dbDataLoaded = true; // we don't need to load db data in this case
        this.checkEndLoad();
        this.router.navigateByUrl("/login");
      }else{
        this.userData = generateUserData(user);

        this.requestDbData();
      }

      
    });

  }
  requestDbData(){
    this.dbDataLoaded = true;
    this.checkEndLoad();

    this.dbService.requestUserTimetable(this.meetingId, this.userData).then(
      (person : Person) => {
        this.timetableSubj.next(person.timetable);
      }
    );
  }
  timetableChange(timetable : {[id:string]:boolean}){
    this.outputTimetable = timetable;
  }
  checkEndLoad(){
    if (this.calendarLoaded && this.loginLoaded && this.dbDataLoaded){
      this.loaded = true;
      if (this.loadingUI){
        this.dimissLoading();
      }
    }
  }
  pageUpdated(value: number){
    this.currentPage = value;
    if (this.pages != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    //console.log(this.currentPage, this.pages);
  }
  numberOfPagesUpdated(value: number){
    //console.log("number of pages = " + value);
    this.pages = value;
    if (this.currentPage != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    //console.log(this.currentPage, this.pages);
  }

  goToBottom(){
    //this.isBottom = true;
    this.myCalendar.scrollToBottom();
  }

  nextPage(){
    this.myCalendar.nextPage();
  }

  updateBottom(value: boolean){
    console.log("buttom = " + value);
    this.isBottom = value;
  }
  
  save(){
    this.afAuth.user.subscribe

    this.dbService.setUserTimetable(
      this.meetingId,
      createPerson(
        this.userData,
        this.outputTimetable
      ),
      this.userData
    ).then(result => {
      this.showToast('Your timetable have been saved.');
      this.router.navigateByUrl(`/meeting/${this.meetingId}`);
    }).catch( err => {
      this.showToast("err " + err);
    });

    
  }

  async showToast(msg: string){
    let toast = await this.toastController.create({
      message: msg,
      duration: 500,
      position: 'top',
    });
    toast.cssClass = "toast-container";
    toast.present();
  }

  goBack(){
    this.authService.setMeetingId(null);
    this.router.navigateByUrl("/select-use-mode");
  }

  async setLoading() {
    
    this.loadingUI = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    if (!this.loaded){
      return await this.loadingUI.present();
    }
  }
  
  async dimissLoading(){
    return await this.loadingUI.dismiss();
  }
  
}
