import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import EventEmitter from 'events';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-use-mode',
  templateUrl: './select-use-mode.page.html',
  styleUrls: ['./select-use-mode.page.scss'],
})
export class SelectUseModePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    
    this.authService.logOut().then( msg => {
      console.log(msg);
      this.router.navigateByUrl("/login");
    }).catch( msg => {
      console.log(msg);
    })
  }

}
