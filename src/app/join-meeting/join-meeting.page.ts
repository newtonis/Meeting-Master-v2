import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.page.html',
  styleUrls: ['./join-meeting.page.scss'],
})
export class JoinMeetingPage implements OnInit {

  meetingId: string;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  join(){
    console.log("meeting id = " + this.meetingId);

    this.router.navigateByUrl("/select-your-timetable/" + this.meetingId );
  }
}
