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
  private subscriptions = new Subscription();
  constructor(private authService : AuthorizationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.IsLoggedIn;
    this.subscriptions.add(this.authService.loggedIn.subscribe(() => this.isLoggedIn = true));
    this.subscriptions.add(this.authService.loggedOut.subscribe(() => this.isLoggedIn = false));
  }

  Login(){
    this.authService.LoginCodeFlow();
  }

  Logout(){
    this.authService.tryLogOut.next();
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
