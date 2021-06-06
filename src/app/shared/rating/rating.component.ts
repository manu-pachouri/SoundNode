import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating : number;
  manipulatedRating: number;

  constructor() { 
  }

  ngOnInit(): void {
    this.calculateRating();
  }

  private calculateRating(){
    this.manipulatedRating = Math.round(this.rating / 20);
    console.log(this.rating);
    console.log(this.manipulatedRating);
  }
}
