import { AlbumViewComponent } from './album-view/album-view.component';
import { ChartBodyComponent } from './chart-body/chart-body.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHeaderComponent } from './chart-header/chart-header.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path:'browse',
    component: ChartsComponent,
    children:[
      {
        path:'',
        component: ChartBodyComponent
      },
      {
        path:':albumId',
        component: AlbumViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
