import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BroadcastComponent} from "./broadcast/broadcast.component";
import {ChartComponent} from "./chart/chart.component";

const routes: Routes = [
  {path:'broadcast',component:BroadcastComponent},
  {path:'chat',component:ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
