import { AlbumModel, SimplifiedTrackModel } from './../../Models/models';
import { AudioService } from './../../services/audio.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as playerFuncs from './player-functions'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  subscription : Subscription = new Subscription();
  trackImageSmall: string;
  trackImageLarge: string;
  isPlaying: boolean;
  trackPlaying: SimplifiedTrackModel = new SimplifiedTrackModel();
  relatedAlbum: AlbumModel = new AlbumModel();
  isExpanded: boolean;
  totalTrackTime_ms: number;
  elapsedTime_ms: number = this.audioService.currentTime ?? 0;  
  timer;
  playerFuncs = playerFuncs;
  volumeRange: any;
  songSeeker: any;

  constructor(private audioService : AudioService) { }

  ngOnInit(): void {
    this.registerSubs();
    this.volumeRange = document.getElementsByClassName('volume-adjust').item(0);
    this.songSeeker = document.getElementsByClassName('audio-progress-bar').item(0);
    this.setDefaultVolume();
    this.songSeeker.value = 0;
  }

  registerSubs(){
    this.subscription.add(this.audioService.startedPlaying.subscribe((data)=>{
      this.isPlaying = this.audioService.isPlaying;
      this.trackPlaying = this.audioService.getCurrentTrack;
      this.relatedAlbum = this.audioService.getCurrentAlbum;
      this.trackImageSmall = this.relatedAlbum.images[2].url;
      this.trackImageLarge = this.relatedAlbum.images[0].url;
      this.totalTrackTime_ms = this.trackPlaying.duration_ms;
      this.clearTimer();
      this.elapsedTime_ms = 0;
      this.songSeeker.value = 0;
      this.startTimer();
    }));

    this.subscription.add(this.audioService.stoppedPlaying.subscribe(data => {
      this.isPlaying = this.audioService.isPlaying;
      this.songSeeker.value = 100;
      this.resetTimer();
    }));

    this.subscription.add(this.audioService.pausedTrack.asObservable().subscribe(()=>{
      this.isPlaying = this.audioService.isPlaying;
      this.pauseTimer();
    }))

    this.subscription.add(this.audioService.resumedTrack.asObservable().subscribe(data=>{
      this.isPlaying = this.audioService.isPlaying;
      this.startTimer();
    }));
  }

  playPause(){
    if(this.isPlaying){
      this.audioService.pauseTrack.next();
    }else{
      this.audioService.resumeTrack.next();
    }
  }

  startTimer(){
    this.timer = setInterval(()=>{
        this.elapsedTime_ms = this.audioService.currentTime * 1000;
        this.songSeeker.value = (this.elapsedTime_ms/30000)*100;
        if(this.elapsedTime_ms == 30000)
          this.audioService.stopPlaying.next();
    }, 1000);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  clearTimer(){
    window.clearTimeout(this.timer);
  }

  pauseTimer(){
    this.clearTimer();
  }

  resetTimer(){
    this.elapsedTime_ms = 0;
    this.clearTimer();
  }

  toggleExpand(){
    this.isExpanded = !this.isExpanded;
  }

  changeVolume(){
    this.audioService.setVolume = this.volumeRange.value;
  }

  setDefaultVolume(){
    this.volumeRange.value = 40;
    this.audioService.setVolume = 40;
  }

  seekTrack(){
    this.elapsedTime_ms = 300 * this.songSeeker.value;
    this.audioService.seekTrackTime = playerFuncs.fetchTrackTimeins(300*(this.songSeeker.value));
  }
}
