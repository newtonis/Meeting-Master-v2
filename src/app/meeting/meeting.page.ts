import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from '../db.service';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {Clipboard as ClipboardWeb} from '@angular/cdk/clipboard';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionSettings, Person } from '../types';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  meetingId: string;
  loadingUI: HTMLIonLoadingElement = null;
  loaded: boolean = false;
  calendarSettings: Observable<CollectionSettings>;
  calendarSettingsSubj: BehaviorSubject<CollectionSettings> = new BehaviorSubject(null);

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private dbService: DbService,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private clipboardWeb: ClipboardWeb,
    private loadingController: LoadingController,
    private platform: Platform,
    private authService: AuthService
    ) { 
    this.meetingId = this.route.snapshot.paramMap.get("id");
    this.auth.setMeetingId(this.meetingId);
    this.dbService.requestUserData(this.meetingId);
  }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.setLoading();
    // check if logged
    this.afAuth.authState.subscribe(user => {
      if (user == null){ // not logged in
        this.loaded = true;
        if (this.loadingUI){
          this.dimissLoading();
        }
        this.router.navigateByUrl("/login");
      }else{
        this.dbService.hasUserSetTimetable(this.meetingId).then(ans => {
          console.log(this.meetingId, ans);
          this.loaded = true;
          if (this.loadingUI){
            this.dimissLoading();
          }

          if (ans == false){
            this.router.navigateByUrl("/select-your-timetable/"+ this.meetingId); // user didn't fill it's timetable
          }
        }).catch(msg => {
          console.log(msg);
          this.loaded = true;
          if (this.loadingUI){
            this.dimissLoading();
          }
        });
      }
    });
    this.dbService.loadCollectionInBackground(this.authService.getMeetingId());
    this.dbService.requestUserData(this.authService.getMeetingId());
    this.authService.refreshPeople();
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
  
  goBack(){
    this.router.navigateByUrl("/select-your-timetable/" + this.meetingId.replace(/ /g, '%20') );
  }

  copyLink(){
    var link: string = "https://meetingmaster.web.app/meeting/"+ this.meetingId.replace(/ /g, '%20');

    if (this.platform.is("android")){
      try{
        this.clipboard.copy(link);
        this.clipboardWeb.copy(link);
      }catch{

      }
    }else if(this.platform.is("desktop")){
      try{
        this.clipboard.copy(link);
        this.clipboardWeb.copy(link);
      }catch{
        
      }
    }else{
      try{
        this.clipboard.copy(link);
        this.clipboardWeb.copy(link);
      }catch{
        
      }
    }
    this.showToast("Link to join copied to clipboard!");
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
}
