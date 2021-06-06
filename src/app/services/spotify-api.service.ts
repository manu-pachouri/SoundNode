import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlbumModel, AlbumsPagingModel, ArtistModel, PrivateUserModel } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private BASE_URI = 'https://api.spotify.com/';
  private countryCode = 'IN';
  constructor(private httpClient : HttpClient) { }

  getNewReleases(next: string = null){
    var url = next ? next : this.BASE_URI+'v1/browse/new-releases';
    let params = new HttpParams()
    .set('country', this.countryCode)
    .set('limit', '25');

    return this.httpClient
    .get<AlbumsPagingModel<AlbumModel>>(url, { params: params });
  }

  getUserProfile(){
    return this.httpClient.get<PrivateUserModel>(this.BASE_URI+'v1/me');
  }

  getAlbumWithId(id: string){
    let params = new HttpParams()
    .set('country', this.countryCode);

    return this.httpClient.get<AlbumModel>(this.BASE_URI+'v1/albums/'+id, {params: params});
  }

  getArtists(ids: Array<string>){
    var params = new HttpParams()
    .set('ids', ids.join(','));
    return this.httpClient.get<{artists: Array<ArtistModel>}>(this.BASE_URI+'v1/artists',{params: params});
  }
}
