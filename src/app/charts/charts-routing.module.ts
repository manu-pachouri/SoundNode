import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHeaderComponent } from './chart-header/chart-header.component';

const routes: Routes = [
  {
    path: '',
    component: ChartHeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
