import { SongCardComponent } from './song-card/song-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SongCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SongCardComponent]
})
export class SharedModule { }
