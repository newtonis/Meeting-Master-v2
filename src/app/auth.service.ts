import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User = null;

  constructor(
  ) { }

  setUser(user: firebase.User){
    this.user = user;
  }
  getUser() : firebase.User{
    return this.user;
  }
}
