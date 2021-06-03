import { PrivateUserModel } from './../Models/models';
import { AuthorizationService } from './../services/authorization.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn : boolean;
  userImageUrl: string;
  userName: string;

  private subscriptions = new Subscription();
  constructor(private authService : AuthorizationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.subscriptions.add(this.authService.loggedIn.subscribe((userInfo: PrivateUserModel) => {
      this.isLoggedIn = true;
      this.getUserData();
    }));
    this.subscriptions.add(this.authService.loggedOut.subscribe(() => {
      this.isLoggedIn = false;
    }));

    this.getUserData();
  }

  getUserData(){
    if(this.authService.isLoggedIn){
      var userData = this.authService.getUserInfo;
      this.userImageUrl = userData.images[0].url;
      this.userName = userData.display_name;
    }
  }

  Login(){
    this.authService.loginCodeFlow();
  }

  Logout(){
    this.authService.tryLogOut.next();
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
