import { AudioService } from './../../services/audio.service';
import { SimplifiedTrackModel } from './../../Models/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
    var seconds = (this.track.duration_ms / (1000 * 60)).toFixed(2);
    var duration_s = seconds.split('.').join(':');
    return duration_s;
  }

  playTrack(){
    this.hasStartedPlaying.emit(true);
    this.audioService.startTrack.next(this.track);
  }

}
