import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { ChartComponent } from './chart/chart.component';
import { ConnectLineComponent } from './connect-line.component';

const routes: Routes = [
  {path:'',component:ConnectLineComponent,children:[
    {path:'broadcast',component:BroadcastComponent},
    {path:'chat',component:ChartComponent}
  ]},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLineRoutingModule { }
