import { SpotifyApiService } from './../../services/spotify-api.service';
import { Component, OnInit } from '@angular/core';
import { AlbumModel, PagingModel } from 'src/app/Models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart-body',
  templateUrl: './chart-body.component.html',
  styleUrls: ['./chart-body.component.scss']
})
export class ChartBodyComponent implements OnInit {
  albums : Array<AlbumModel> = new Array<AlbumModel>();
  //fetch url for next loading albums
  nextFetchUrl: string;

  constructor(private spotifyApiService : SpotifyApiService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(next: string = null){
    this.spotifyApiService.getNewReleases(next).subscribe(
      data => {
        this.albums.push(...data.albums.items);
        this.nextFetchUrl = data.albums.next;
      }
    );
  }

  loadMore(){
    this.getAlbums(this.nextFetchUrl);
  }

  previewAlbum(id: string){
    this.router.navigate([id],{ relativeTo: this.activeRoute});
  }
}
