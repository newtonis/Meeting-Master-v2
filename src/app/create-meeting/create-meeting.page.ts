import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { isAfter, format, parse, eachDayOfInterval } from 'date-fns';
import { DbService } from '../db.service';
import { createCollectionSettingsDateMode, createCollectionSettingsWeekMode } from '../types';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage implements OnInit {
  mode: string;
  meetingId: string;
  weekdays: string[];

  startDate: string;
  endDate: string;

  startHour: string;
  endHour: string;

  constructor(
    private toastController: ToastController, 
    private DbService: DbService, 
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
    ) { }

  ngOnInit() {
  }

  createMeeting(){
    if (this.mode == "Custom dates"){
      this.createMeetingCustomDateMode();
    }else if (this.mode == "Week"){
      this.createMeetingWeekMode();
    }
  }
  createMeetingCustomDateMode(){

    if (this.startDate == undefined || this.endDate == undefined || this.startHour == undefined || this.endHour == undefined){
      console.log("Invalid date");
      this.showToast("Date or hours not selected");

      return 0;
    }

    console.log("Date range:")
    var startDate: string = this.startDate.split('T')[0];
    var endDate: string = this.endDate.split('T')[0];

    console.log(startDate);
    console.log(endDate);

    if (isAfter(
      parse(startDate,"yyyy-mm-dd",new Date()),
      parse(endDate,"yyyy-mm-dd",new Date()),
      )){
        console.log("Invalid date range");
        this.showToast("Invalid date range");
        return 0;
    }

    console.log("Hour range:");

    var startHour: number = +this.startHour.split('T')[1].substr(0, 2);
    var endHour: number = +this.endHour.split('T')[1].substr(0, 2);

    console.log(startHour);
    console.log(endHour);

    // validate values

    if (startHour > endHour){
      console.log("Invalid hour");
      this.showToast("Invalid hour range");

      return 0;
    }
    this.afAuth.authState.subscribe((user: firebase.User) => {
      console.log("User = " + user);

      this.DbService.createMeeting(
        createCollectionSettingsDateMode(
          this.meetingId,
          user.email,
          startDate,
          endDate,
          startHour,
          endHour
        )
      ).then(msg => {
        this.showToast("Meeting created succesfully");
        this.router.navigateByUrl("/select-your-timetable/"+this.meetingId);
      }).catch(err => {
        this.showToast(err);
      });
    });
    
  }

  createMeetingWeekMode(){

    if (this.startHour == undefined || this.endHour == undefined){
      console.log("Invalid date");
      this.showToast("Date or hours not selected");

      return 0;
    }

    var startHour: number = +this.startHour.split('T')[1].substr(0, 2);
    var endHour: number = +this.endHour.split('T')[1].substr(0, 2);

    console.log(startHour);
    console.log(endHour);

    // validate values

    if (startHour > endHour){
      console.log("Invalid hour");
      this.showToast("Invalid hour range");

      return 0;
    }

    if (this.weekdays.length == 0){
      console.log("invalid weekdays");
      this.showToast("Select at least 1 week day");
    }


    this.afAuth.authState.subscribe((user: firebase.User) => {
      console.log("User = " + user);

      this.DbService.createMeeting(
        createCollectionSettingsWeekMode(
          this.meetingId,
          user.email,
          startHour,
          endHour,
          this.weekdays
        )
      ).then(msg => {
        this.showToast("Meeting created succesfully");
        this.router.navigateByUrl("/select-your-timetable/"+this.meetingId);
      }).catch(err => {
        this.showToast(err);
      });
    });
  }

  async showToast(msg: string){
    let toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

}
