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

  getNewReleases(offset = 0){
    let params = new HttpParams()
    .set('country', this.countryCode)
    .set('offset', offset.toString())
    .set('limit', '25');

    return this.httpClient
    .get<AlbumsPagingModel<AlbumModel>>(this.BASE_URI+'v1/browse/new-releases', { params: params })
  }

  getUserProfile(){
    return this.httpClient.get<PrivateUserModel>(this.BASE_URI+'v1/me');
  }
}
