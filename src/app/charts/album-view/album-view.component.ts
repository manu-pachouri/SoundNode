import { AudioService } from './../../services/audio.service';
import { ArtistModel, PagingModel, SimplifiedTrackModel, TracksPagingModel } from './../../Models/models';
import { SpotifyApiService } from './../../services/spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumModel } from 'src/app/Models/models';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit {
  albumImageUrl: string = '';
  copyRightsText = '';
  album: AlbumModel = new AlbumModel();
  tracks = new PagingModel<SimplifiedTrackModel>();
  artists = new Array<ArtistModel>();

  constructor(private activeRoute: ActivatedRoute,
    private spApiService : SpotifyApiService,
    private audioService: AudioService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        this.getAlbumDetails(params['albumId']);
      }
    );
  }

  getAlbumDetails(id: string){
    this.spApiService.getAlbumWithId(id).subscribe(
      data => {
        this.album = data;
        this.tracks = data.tracks;
        this.albumImageUrl = this.album.images[0].url;
        this.copyRightsText = this.album.copyrights[0].text;
        this.getArtistsDetails(this.album.artists.map(a => a.id));
      }
    );
  }

  getArtistsDetails(ids: Array<string>){
    this.spApiService.getArtists(ids).subscribe(
      data => {
        this.artists = data['artists'];
      }
    );
  }

  passAlbumDetails(){
    this.audioService.playingAlbum.next(this.album);
  }
}
