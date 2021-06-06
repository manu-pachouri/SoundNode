import { AlbumModel } from 'src/app/Models/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {
  @Input() album : AlbumModel;
  imageUrl : string;

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = this.album.images[1].url;
  }
}
