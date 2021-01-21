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
    var url = "https://meetingmaster.web.app";
    var url2 = "meetingmaster.web.app";
    if (this.meetingId.startsWith(url)){
      console.log("complete id");
      //window.location.href = this.meetingId;
      this.router.navigateByUrl(this.meetingId.substr(url.length, this.meetingId.length-url.length));
    }else if(this.meetingId.startsWith(url2)){
      //window.location.href = this.meetingId;
      this.router.navigateByUrl(this.meetingId.substr(url2.length, this.meetingId.length-url2.length));
    }else{
      this.router.navigateByUrl("/select-your-timetable/" + this.meetingId );
    }
  }
}
