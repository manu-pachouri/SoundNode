import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {
  imageurl : string;
  constructor() { }

  ngOnInit(): void {
  }

}
