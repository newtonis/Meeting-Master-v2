import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import EventEmitter from 'events';
import firebase from 'firebase';
import { CollectionSettings } from './types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User = null;
  collectionSettings: CollectionSettings = null;
  meetingId: string = null;
  
  constructor(private platform: Platform,
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth) { }

  setUser(user: firebase.User){
    this.user = user;
  }
  getUser() : firebase.User{
    return this.user;
  }
  setMeetingId(id: string){
    this.meetingId = id;
  }
  getMeetingId() : string{
    return this.meetingId;
  }
  setCollectionSettings(data: CollectionSettings){
    this.collectionSettings = data;
  }
  getCollectionSettigs(): CollectionSettings{
    return this.collectionSettings;
  }
  logOut(){ // logout for android and desktop
    var resolves, rejects;

    const emitter = new EventEmitter();

    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });
    
    if (this.platform.is("android")){
      this.googlePlus.logout().then(msg => {
        console.log("logout " + msg);
        resolves("logout "+ msg);
      }).catch(msg => {
        rejects("error: " + msg);
      });
    }else if(this.platform.is("desktop")){
      this.afAuth.signOut().then(msg => {
        console.log("logout " + msg);
        resolves("logout: "+ msg);
      }).catch(msg => {
        rejects("error: " + msg);
      })
    }
    
    return promise;
  }
}
