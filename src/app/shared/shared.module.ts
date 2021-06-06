import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { TracksComponent } from './tracks/tracks.component';
import { RatingComponent } from './rating/rating.component';
import { PlayerComponent } from './player/player.component';



@NgModule({
  declarations: [
    AlbumCardComponent,
    TracksComponent,
    RatingComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlbumCardComponent,
    TracksComponent,
  RatingComponent,
  PlayerComponent
]
})
export class SharedModule { }
