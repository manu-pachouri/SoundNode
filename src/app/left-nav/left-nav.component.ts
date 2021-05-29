import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu($event){
    let element = document.getElementsByClassName('menu-expanded').length > 0 ? 
    document.getElementsByClassName('menu-expanded').item(0) as HTMLElement : 
    document.getElementsByClassName('menu-compressed').item(0) as HTMLElement;
    if(element.classList.contains('menu-expanded')){
      element.classList.add('menu-compressed');
      element.classList.remove('menu-expanded');
    }else{
      element.classList.remove('menu-compressed');
      element.classList.add('menu-expanded');
    }
  }
}
