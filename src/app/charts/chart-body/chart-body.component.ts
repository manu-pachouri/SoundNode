import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-body',
  templateUrl: './chart-body.component.html',
  styleUrls: ['./chart-body.component.scss']
})
export class ChartBodyComponent implements OnInit {
  items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  constructor() { }

  ngOnInit(): void {
  }

}
