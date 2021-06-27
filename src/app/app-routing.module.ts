import { AuthGuard } from './auth/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'charts/browse',
    pathMatch: 'full'
  },
  {
    path: 'charts',
    loadChildren: ()=>import('./charts/charts.module').then(m => m.ChartsModule),
  },
  {
    path: 'auth',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
