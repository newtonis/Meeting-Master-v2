import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.page.html',
  styleUrls: ['./join-meeting.page.scss'],
})
export class JoinMeetingPage implements OnInit {

  meetingId: string;
  msg_invite: string = "";
  
  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.getMeetingId()){
      this.meetingId = this.auth.getMeetingId();
      this.msg_invite = "You were invited to " + this.meetingId;
    }
  }

  join(){
    console.log("meeting id = " + this.meetingId);

    if (this.meetingId.startsWith("https://meetingmaster.web.app")){
      this.router.navigateByUrl(this.meetingId);
    }else if(this.meetingId.startsWith("meetingmaster.web.app")){
      this.router.navigateByUrl(this.meetingId);
    }else{
      this.router.navigateByUrl("/select-your-timetable/" + this.meetingId );
    }
  }
}
