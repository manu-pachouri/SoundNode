import { authConfig } from './../auth.config';
import { Injectable, OnInit } from '@angular/core';
import { LoginOptions, OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthorizationService implements OnInit {
  constructor(private oauthClient : OAuthService) {
    this.oauthClient.configure(authConfig);
  }
  
  ngOnInit(): void {
  }
  
  Login(){
    this.oauthClient.initCodeFlow();
  }

  Logout(){
    this.oauthClient.revokeTokenAndLogout();
  }
}
