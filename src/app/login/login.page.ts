import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import { auth } from 'firebase/app';
import EventEmitter from 'events';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { promise } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(
    private authService: AuthService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signInGoogle(){
    this.asyncSignInGoogle().then(
        (success : firebase.User) => {
          console.log("Login succesfull");
          console.log(success);
          this.router.navigateByUrl("/select-use-mode");
        },
        (reject => {
          console.log("Login rejected");
          console.log(reject);
        })
    )
  }
  asyncSignInGoogle(){

    var resolves, rejects;

    const emitter = new EventEmitter();

    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });

    console.log("Starting to sign in with google");

    if (this.platform.is("android")){
      this.googlePlus.login({
        'webClientId': '649189702387-nag7umiotvopstkvj1h8ub1iuoa2ddbh.apps.googleusercontent.com',
        'offline': true
      }).then((obj) => {
          if (!firebase.auth().currentUser) {
              firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
              .then((success) => {
                console.log("signInWithCredential successful");
                
                resolves(firebase.auth().currentUser);
              })
              .catch((gplusErr) => {
                rejects("GooglePlus failed error= "+gplusErr);
              });
          }
      }).catch( (msg) => {
        rejects("Gplus signin failed error=" + msg);
      });
    }else if(this.platform.is("desktop")){
      console.log("runing in desktop");

      var provider = new auth.GoogleAuthProvider();

      this.afAuth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential;
        // The signed-in user info.
        var user = result.user;
      
        console.log("Signed in user= " + user.displayName + " token= " + token.providerId);
        resolves(user);
        // ...
      }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        rejects("Error in login = " + errorCode);
      });
    }

    return promise; 
  }
}
