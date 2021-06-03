import { TokenModel } from './../Models/models';
import { authConfig } from './../auth.config';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService implements OnInit {
  private tokenName = 'token_data';
  private tokenData : TokenModel;
  private logOutTimer;
  //to log in
  tryLogin = new Subject<TokenModel>();
  //to log out
  tryLogOut = new Subject();
  //subject which fires when logged in
  loggedIn = new Subject();
  //subject which fires when logged out
  loggedOut = new Subject();

  constructor(private oauthClient : OAuthService,
    private router: Router) {
    //configure for code flow
    this.oauthClient.configure(authConfig);
    
    //get token data from local storage
    this.getTokenDataFromLocal();
    
    //logout on app start if token has already expired
    if(this.tokenData && this.ExpirationTime < 0){
      this.Logout();
    }

    //register subscriptions for login and logout
    this.createSubscriptions();
  }

  ngOnInit(): void {
  }
  
  LoginCodeFlow(){
    this.oauthClient.initImplicitFlow();
  }

  private Logout(){
    // this.oauthClient.revokeTokenAndLogout();
    localStorage.removeItem(this.tokenName);
    this.tokenData = null;
    window.clearTimeout(this.logOutTimer);
    this.loggedOut.next();
    console.log(`Logged Out! ${new Date()}`);
    this.router.navigateByUrl('/charts'); 
  }

  private createLogoutHandler(){
    this.logOutTimer = setTimeout(()=>{
      this.Logout();
    }, this.ExpirationTime * 1000);
  }

  private createSubscriptions(){
    this.tryLogin.asObservable().subscribe(
      data => {
        this.tokenData = data;
        this.tokenData.timeStamp = new Date();
        localStorage.setItem(this.tokenName, JSON.stringify(this.tokenData));
        this.createLogoutHandler();
        this.loggedIn.next();
        console.log(`logged In! : ${new Date()}`);    
        this.router.navigateByUrl('/charts');    
      },
    );

    this.tryLogOut.asObservable().subscribe(
      data => {
        this.Logout();
      }
    );
  }

  private getTokenDataFromLocal(){
    var tokenData = JSON.parse(localStorage.getItem(this.tokenName));
    if(tokenData){
      tokenData.timeStamp = new Date(tokenData.timeStamp);
      this.tokenData = tokenData;
    }
  }

  get IsLoggedIn(){
    return this.tokenData != null;
  }

  get IsLoggedOut(){
    return this.tokenData == null;
  }

  get ExpirationTime(){
    if(this.tokenData){
      var elapsedTime = (new Date().getTime() - this.tokenData.timeStamp.getTime()) / 1000;
      console.log('Time since last token fetch:- '+elapsedTime+'seconds');
      return this.tokenData?.expires_in - elapsedTime;
    }
    return -1;
  }

  get GetAccessToken(){
    return this.tokenData?.access_token;
  }
}
