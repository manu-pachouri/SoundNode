import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { AuthorizationService } from '../services/authorization.service';
import { TokenModel } from '../Models/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private router : Router,
    private activeRoute : ActivatedRoute,
    private http : HttpClient,
    private authService : AuthorizationService) { }

  ngOnInit(): void {
  }

  LoginCodeFlow(){
    this.activeRoute.queryParams.subscribe(
      params => {
        var code = params['code'];
        var encodeData = window.btoa(environment.clientID+':'+environment.clientSecret);
        var headers = new HttpHeaders()
        .set('Authorization', 'Basic '+ encodeData)
        .set('Content-Type', 'application/x-www-form-urlencoded');

        var body = `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirectUri}/auth`;
        this.http.post('https://accounts.spotify.com/api/token',body,{
          headers: headers
        })
        .pipe(map((data : TokenModel) => data))
        .subscribe(tokenModel => {
          this.authService.tryLogin.next(tokenModel);
        });
      }
    );
  }
  
  ngOnDestroy(): void {
  }
}