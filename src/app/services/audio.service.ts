import { ToasterService } from './toaster.service';
import { AlbumModel } from './../Models/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SimplifiedTrackModel } from '../Models/models';
import * as PlayerFuncs from '../shared/player/player-functions';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private currentlyPlaying: HTMLAudioElement = new Audio();
  private activeTrack: SimplifiedTrackModel;
  private albumPlaying: AlbumModel;
  private totalPlayTime = 30000;
  private elapsedTime_ms : number;
  private timer1: any;
  private timer2: any;

  startTrack = new Subject<SimplifiedTrackModel>();
  startedPlaying = new Subject<SimplifiedTrackModel>();
  pauseTrack = new Subject<SimplifiedTrackModel>();
  pausedTrack = new Subject<SimplifiedTrackModel>();
  resumeTrack = new Subject<SimplifiedTrackModel>();
  resumedTrack = new Subject<SimplifiedTrackModel>();
  stopPlaying = new Subject<SimplifiedTrackModel>();
  stoppedPlaying = new Subject<SimplifiedTrackModel>();
  playingAlbum = new Subject<AlbumModel>();

  constructor(private toastServ : ToasterService) {
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
      (album) => this.albumPlaying = album
    );

    this.resumeTrack.asObservable().subscribe((data)=>{
        this.startTimer();
        this.currentlyPlaying.play();
        this.resumedTrack.next();
    });

    this.pauseTrack.asObservable().subscribe(()=>{
      this.pauseCurrentPlaying()
    });
   }

  private buildAudioFromTrack(track: SimplifiedTrackModel){
    let audio = new Audio();
    audio.src = track.preview_url;
    audio.volume = this.getVolume;
    audio.load();
    return audio;
  }

  private playTrack(track: SimplifiedTrackModel){
    this.stopCurrentPlaying();
    this.setAsCurrentTrack(track);
    var audio = this.buildAudioFromTrack(track);
    this.playAudio(audio);
    this.elapsedTime_ms = 0;
    this.startTimer();
    this.startedPlaying.next();
  }

  private stopCurrentPlaying(){
    this.clearTimer();
    this.currentlyPlaying.pause();
    this.stoppedPlaying.next();
  }

  private pauseCurrentPlaying(){
    this.clearTimer();
    this.currentlyPlaying.pause();
    this.pausedTrack.next();
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

  private startTimer(){
    var elapsedTime_ms = this.currentlyPlaying.currentTime * 1000;

    this.timer2 = setTimeout(() => {
      this.stopCurrentPlaying();
    }, 30000-this.elapsedTime_ms);
  }

  private clearTimer(){
    window.clearTimeout(this.timer2);
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

  set setVolume(volumeLevel: number){
    this.currentlyPlaying.volume = (volumeLevel/100);
  }

  get getVolume(): number{
    return this.currentlyPlaying.volume ?? 0.5;
  }

  set seekTrackTime(seekTime: number){
    this.currentlyPlaying.currentTime = Math.round(seekTime);
    this.clearTimer();
    this.startTimer();
  }

  get currentTime(){
    return this.currentlyPlaying.currentTime;
  }
}
