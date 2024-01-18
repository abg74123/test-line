import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterLineComponent} from "./register-line/register-line.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path: 'connect',
    loadChildren: () => import('./connect-line/connect-line.module').then(m => m.ConnectLineModule)
  },
  {
    path: 'register',
    component:RegisterLineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
