import { AuthorizationService } from './../services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthorizationService) { }

  ngOnInit(): void {
  }

  Login(){
    this.authService.Login();
  }

  Logout(){
    this.authService.Logout();
  }
}
