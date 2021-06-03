import { SpotifyApiService } from './spotify-api.service';
import { PrivateUserModel, TokenModel } from './../Models/models';
import { authConfig } from './../auth.config';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService implements OnInit {
  private tokenName = 'token_data';
  private soundNodeDataTokenName = 'soundnode_data';
  storage : Storage = localStorage;
  private tokenData: TokenModel;
  private userData: PrivateUserModel;
  private logOutTimer;
  //to log in
  tryLogin = new Subject<TokenModel>();
  //to log out
  tryLogOut = new Subject();
  //subject which fires when logged in
  loggedIn = new Subject<PrivateUserModel>();
  //subject which fires when logged out
  loggedOut = new Subject();

  constructor(
    private oauthClient: OAuthService,
    private router: Router,
    private spotifyApiService: SpotifyApiService
  ) {
    //configure for code flow
    this.oauthClient.configure(authConfig);

    //get token data from local storage
    this.getTokenDataFromStorage();

    //logout on app start if token has already expired
    if (this.tokenData && this.expirationTime < 0) {
      this.Logout();
    }

    //register subscriptions for login and logout
    this.createSubscriptions();
  }

  ngOnInit(): void {}

  loginCodeFlow() {
    this.oauthClient.initImplicitFlow();
  }

  private Login(data: TokenModel) {
    this.tokenData = data;
    this.tokenData.timeStamp = new Date();
    this.storage.setItem(this.tokenName, JSON.stringify(this.tokenData));
    this.createLogoutHandler();
    this.storeUserProfileData();
    console.log(`logged In! : ${new Date()}`);
    this.router.navigateByUrl('/charts');
  }

  private Logout() {
    this.storage.removeItem(this.soundNodeDataTokenName);
    this.storage.removeItem(this.tokenName);
    this.tokenData = null;
    window.clearTimeout(this.logOutTimer);
    this.loggedOut.next();
    console.log(`Logged Out! ${new Date()}`);
    this.router.navigateByUrl('/charts');
  }

  private createLogoutHandler() {
    this.logOutTimer = setTimeout(() => {
      this.Logout();
    }, this.expirationTime * 1000);
  }

  private createSubscriptions() {
    this.tryLogin.asObservable().subscribe((data) => {
      this.Login(data);
    });

    this.tryLogOut.asObservable().subscribe((data) => {
      this.Logout();
    });
  }

  private getTokenDataFromStorage() {
    var tokenData = JSON.parse(this.storage.getItem(this.tokenName));
    if (tokenData) {
      tokenData.timeStamp = new Date(tokenData.timeStamp);
      this.tokenData = tokenData;
      this.userData = JSON.parse(
        this.storage.getItem(this.soundNodeDataTokenName)
      );
    }
  }

  private storeUserProfileData() {
    this.spotifyApiService.getUserProfile().subscribe((data) => {
      this.userData = data;
      this.storage.setItem(this.soundNodeDataTokenName, JSON.stringify(data));
      this.loggedIn.next(this.userData);
    });
  }

  get isLoggedIn() {
    return this.tokenData != null;
  }

  get isLoggedOut() {
    return this.tokenData == null;
  }

  get expirationTime() {
    if (this.tokenData) {
      var elapsedTime =
        (new Date().getTime() - this.tokenData.timeStamp.getTime()) / 1000;
      console.log('Time since last token fetch:- ' + elapsedTime + 'seconds');
      return this.tokenData?.expires_in - elapsedTime;
    }
    return -1;
  }

  get getAccessToken() {
    return this.tokenData?.access_token;
  }

  get getUserInfo() {
    return this.userData;
  }
}
