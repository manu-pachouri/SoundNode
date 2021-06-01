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
    var rightContainer = document.body.getElementsByClassName('right-container-expanded').length > 0 ? document.body.getElementsByClassName('right-container-expanded').item(0).classList : 
    document.body.getElementsByClassName('right-container-compressed').item(0).classList;
    if(element.classList.contains('menu-expanded')){
      element.classList.add('menu-compressed');
      element.classList.remove('menu-expanded');
      rightContainer.add('right-container-expanded');
      rightContainer.remove('right-container-compressed');
    }else{
      rightContainer.remove('right-container-expanded');
      rightContainer.add('right-container-compressed');
      element.classList.remove('menu-compressed');
      element.classList.add('menu-expanded');
    }
  }
}
