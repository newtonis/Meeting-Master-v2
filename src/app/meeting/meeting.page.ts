import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  meetingId: string;

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth
    ) { 
    this.meetingId = this.route.snapshot.paramMap.get("id");
    this.auth.setMeetingId(this.meetingId);
  }

  ngOnInit() {
    // check if logged
    this.afAuth.authState.subscribe(user => {
      if (user == null){ // not logged in
        this.router.navigateByUrl("/login");
      }
    });
  }

  goBack(){
    this.router.navigateByUrl("/select-your-timetable/" + this.meetingId );
  }
}
