import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BroadcastComponent } from './broadcast/broadcast.component';
import {HttpClientModule} from "@angular/common/http";
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
