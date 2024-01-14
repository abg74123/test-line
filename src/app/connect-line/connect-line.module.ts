import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectLineRoutingModule } from './connect-line-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectLineComponent } from './connect-line.component';
import { ChartComponent } from './chart/chart.component';
import { BroadcastComponent } from './broadcast/broadcast.component';


@NgModule({
  declarations: [ConnectLineComponent, BroadcastComponent,ChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConnectLineRoutingModule
  ]
})
export class ConnectLineModule { }
