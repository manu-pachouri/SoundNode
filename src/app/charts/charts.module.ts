import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartHeaderComponent } from './chart-header/chart-header.component';
import { ChartBodyComponent } from './chart-body/chart-body.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { ChartsComponent } from './charts/charts.component';


@NgModule({
  declarations: [
    ChartHeaderComponent, 
    ChartBodyComponent, AlbumViewComponent, ChartsComponent,
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    SharedModule
  ]
})
export class ChartsModule { }
