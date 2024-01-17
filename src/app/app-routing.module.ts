import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InfoComponent} from "./info/info.component";

const routes: Routes = [
  {
    path: 'connect',
    loadChildren: () => import('./connect-line/connect-line.module').then(m => m.ConnectLineModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-line/login-line.module').then(m => m.LoginLineModule)
  },
  {
    path:'info',component:InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
