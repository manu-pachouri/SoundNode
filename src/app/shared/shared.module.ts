import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { TracksComponent } from './tracks/tracks.component';
import { RatingComponent } from './rating/rating.component';
import { PlayerComponent } from './player/player.component';
import { ToasterComponent } from './toaster/toaster.component';



@NgModule({
  declarations: [
    AlbumCardComponent,
    TracksComponent,
    RatingComponent,
    PlayerComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    AlbumCardComponent,
    TracksComponent,
  RatingComponent,
  PlayerComponent,
  ToasterComponent
]
})
export class SharedModule { }
