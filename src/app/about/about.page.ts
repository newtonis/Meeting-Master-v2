import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,) { }

  ngOnInit() {
  }
  goBack(){
    this.authService.setMeetingId(null);
    this.router.navigateByUrl("/login");
  }
}
