import { AlbumModel, SimplifiedTrackModel } from './../../Models/models';
import { AudioService } from './../../services/audio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  trackImage: string;
  isPlaying: boolean;
  trackPlaying: SimplifiedTrackModel;
  relatedAlbum: AlbumModel;
  constructor(private audioService : AudioService) { }

  ngOnInit(): void {
    this.registerSubs();
  }

  registerSubs(){
    this.audioService.startedPlaying.subscribe((data)=>{
      this.isPlaying = this.audioService.isPlaying;
      this.trackPlaying = this.audioService.getCurrentTrack;
      this.relatedAlbum = this.audioService.getCurrentAlbum;
      this.trackImage = this.relatedAlbum.images[2].url;
    });

    this.audioService.stoppedPlaying.subscribe(data => {
      this.isPlaying = this.audioService.isPlaying;
    });

    this.audioService.resumedTrack.asObservable().subscribe(data=>{
      this.isPlaying = this.audioService.isPlaying;
    })
  }

  playPause(){
    if(this.isPlaying){
      this.audioService.stopPlaying.next();
    }else{
      this.audioService.resumeTrack.next();
    }
  }
}
