import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BroadcastComponent} from "./connect-line/broadcast/broadcast.component";
import {ChartComponent} from "./connect-line/chart/chart.component";

const routes: Routes = [
  {
    path: 'connect',
    loadChildren: () => import('./connect-line/connect-line.module').then(m => m.ConnectLineModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-line/login-line.module').then(m => m.LoginLineModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
