import { AlbumModel } from './../Models/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SimplifiedTrackModel } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private currentlyPlaying: HTMLAudioElement = new Audio();
  private activeTrack: SimplifiedTrackModel;
  private albumPlaying: AlbumModel;

  startTrack = new Subject<SimplifiedTrackModel>();
  startedPlaying = new Subject<SimplifiedTrackModel>();
  pauseTrack = new Subject<SimplifiedTrackModel>();
  pausedTrack = new Subject<SimplifiedTrackModel>();
  resumeTrack = new Subject<SimplifiedTrackModel>();
  resumedTrack = new Subject<SimplifiedTrackModel>();
  stopPlaying = new Subject<SimplifiedTrackModel>();
  stoppedPlaying = new Subject<SimplifiedTrackModel>();
  playingAlbum = new Subject<AlbumModel>();

  constructor() {
    this.registerSubscriptions();
   }

   private registerSubscriptions(){
    this.startTrack.asObservable().subscribe(track =>{
      this.playTrack(track);
    });

    this.stopPlaying.asObservable().subscribe((track)=>{
      this.stopCurrentPlaying();
    });

    this.playingAlbum.asObservable().subscribe(
      (album) => this.albumPlaying = album );

    this.resumeTrack.asObservable().subscribe((data)=>{
      this.currentlyPlaying.play();
      this.resumedTrack.next();
    })
   }

  private buildAudioFromTrack(track: SimplifiedTrackModel){
    let audio = new Audio();
    audio.src = track.preview_url;
    return audio;
  }

  private playTrack(track: SimplifiedTrackModel){
    this.stopCurrentPlaying();
    this.setAsCurrentTrack(track);
    var audio = this.buildAudioFromTrack(track);
    this.playAudio(audio);
    this.startedPlaying.next();
  }

  private stopCurrentPlaying(){
    if(!this.currentlyPlaying.paused){
      this.currentlyPlaying.pause();
      this.stoppedPlaying.next();
    }
  }

  private playAudio(audio: HTMLAudioElement){
    audio.play();
    this.setAsCurrentAudio(audio);
  }

  private setAsCurrentTrack(track: SimplifiedTrackModel){
    this.activeTrack = track;
  }
  
  private setAsCurrentAudio(audio: HTMLAudioElement){
    this.currentlyPlaying = audio;
  }

  get getCurrentTrack(){
    return this.activeTrack;
  }

  get getCurrentAlbum(){
    return this.albumPlaying;
  }

  get isPlaying(){
    return !this.currentlyPlaying.paused;
  }
}
