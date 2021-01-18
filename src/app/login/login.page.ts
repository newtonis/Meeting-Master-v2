import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {NavController, Platform} from '@ionic/angular';
import { auth } from 'firebase/app';
import EventEmitter from 'events';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loaded: boolean = false;
  loadingUI: HTMLIonLoadingElement = null;

  constructor(
    private authService: AuthService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.setLoading();
    
    // we try to make a silent log in
    this.silentLogIn().then(
      (success : firebase.User) => {
        this.loaded = true;
        console.log("Login succesfull");
        console.log(success);
        if (this.loadingUI){
          this.dimissLoading();
        }
        
        this.router.navigateByUrl("/select-use-mode");
        
      },
      (reject => {
        this.loaded = true;
        console.log("Login rejected");
        console.log(reject);
        if (this.loadingUI){
          this.dimissLoading();
        }
        
      })
    )
  }
  async setLoading() {
    
    this.loadingUI = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    if (!this.loaded){
      return await this.loadingUI.present();
    }
  }
  
  async dimissLoading(){
    return await this.loadingUI.dismiss();
  }
  
  silentLogIn(){
    var resolves, rejects;

    const emitter = new EventEmitter();

    const promise = new Promise((resolve, reject) => {
      resolves = resolve;
      rejects = reject;
    });

    console.log("Starting silent sign in with google");

    if (this.platform.is("android")){
      this.googlePlus.trySilentLogin({
        'webClientId': '649189702387-nag7umiotvopstkvj1h8ub1iuoa2ddbh.apps.googleusercontent.com',
        'offline': false
      }).then((obj) => {
        this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj))
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential;
            // The signed-in user info.
            var user = result.user;
            //this.authService.setUser(user);
            this.afAuth.updateCurrentUser(user);
            console.log("Signed in user= " + user.displayName + " token= " + token.providerId);
            resolves(result.user);
          })
          .catch((gplusErr) => {
            rejects("GooglePlus failed error= "+gplusErr);
          });
    }).catch( (msg) => {
        rejects("Gplus signin failed error=" + msg);
      });
    }else if(this.platform.is("desktop")){
      console.log("running in desktop");

        this.afAuth.authState.subscribe( (user : firebase.User) =>{
          if (user != null){
            console.log("Signed in user= " + user.displayName + " token= " + user.providerId);
            //this.afAuth.updateCurrentUser(user);
            
            resolves(user);
            // ...
          }else{
            rejects("User not logged");
          }
        });
      }
    return promise; 
  }
  signInGoogle(){
    this.asyncSignInGoogle().then(
        (success : firebase.User) => {
          console.log("Login succesfull");
          console.log(success);
         // this.authService.setUser(success);
         // this.afAuth.updateCurrentUser(success);
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
        
        this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj))
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential;
            // The signed-in user info.
            var user = result.user;
            //this.authService.setUser(user);
            //this.afAuth.updateCurrentUser(user);
            console.log("Signed in user= " + user.displayName + " token= " + token.providerId);
            resolves(result.user);
          })
          .catch((gplusErr) => {
            rejects("GooglePlus failed error= "+gplusErr);
          });
        
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
        //this.authService.setUser(user);
        //this.afAuth.updateCurrentUser(user);
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
        rejects("Error in login = " + errorCode + " " + errorMessage);
      });
    }

    return promise; 
  }
}
