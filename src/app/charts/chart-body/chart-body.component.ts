import { SpotifyApiService } from './../../services/spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { AlbumModel, PagingModel } from 'src/app/Models/models';

@Component({
  selector: 'app-chart-body',
  templateUrl: './chart-body.component.html',
  styleUrls: ['./chart-body.component.scss']
})
export class ChartBodyComponent implements OnInit {
  newReleases : PagingModel<AlbumModel>;
  albums : Array<AlbumModel>;

  constructor(private spotifyApiService : SpotifyApiService) { }

  ngOnInit(): void {
    this.spotifyApiService.getNewReleases().subscribe(
      data => {
        this.newReleases = data.albums;
        this.albums = data.albums.items;
      }
    );
  }

}
