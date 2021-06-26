import { AudioService } from './../../services/audio.service';
import { SimplifiedTrackModel } from './../../Models/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as playerFunc from '../player/player-functions';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  @Input() track: SimplifiedTrackModel;
  @Output() hasStartedPlaying = new EventEmitter<boolean>();
  
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
  }

  getTrackDuration(){
    return playerFunc.displayTrackTime(this.track.duration_ms);  
  }

  playTrack(){
    this.hasStartedPlaying.emit(true);
    this.audioService.startTrack.next(this.track);
  }

}
