import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CollectionSettings } from '../types';
import { DbService } from '../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCalendarComponent } from '../dynamic-calendar/dynamic-calendar.component';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-your-timetable',
  templateUrl: './select-your-timetable.page.html',
  styleUrls: ['./select-your-timetable.page.scss'],
})
export class SelectYourTimetablePage implements OnInit {

  calendarSettings: Observable<CollectionSettings>;
  testTimetable: Observable<{[id:string]:boolean}>;
  id: string;
  lastSlide: boolean = false;
  pages: number = null;
  currentPage: number = null;
  isBottom: boolean = false;

  @ViewChild('myCalendar') myCalendar: DynamicCalendarComponent;
  

  constructor(
    private dbService: DbService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastController: ToastController,
    private authService: AuthService) {

      this.dbService.loadCollection("ExampleTimetable", false);
      this.calendarSettings = this.dbService.getCollectionSettings();
      this.id = this.route.snapshot.paramMap.get('id');
      this.testTimetable = of({"2020-01-01T00":true,"2020-01-01T05":true});
    
  }
  ngOnInit() {

  }
  pageUpdated(value: number){
    this.currentPage = value;
    if (this.pages != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    console.log(this.currentPage, this.pages);
  }
  numberOfPagesUpdated(value: number){
    console.log("number of pages = " + value);
    this.pages = value;
    if (this.currentPage != null){
      this.lastSlide = (this.pages-1 == this.currentPage);
    }else{
      this.lastSlide = false;
    }
    console.log(this.currentPage, this.pages);
  }

  goToBottom(){
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
    this.showToast();
    console.log(this.id);
    this.router.navigateByUrl(`/meeting/${this.id}`);
  }

  async showToast(){
    let toast = await this.toastController.create({
      message: 'Your timetable have been saved.',
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
}
