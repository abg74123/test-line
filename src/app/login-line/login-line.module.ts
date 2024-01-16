import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLineRoutingModule } from './login-line-routing.module';
import { LoginLineComponent } from './login-line.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [LoginLineComponent],
  imports: [
    CommonModule,
    LoginLineRoutingModule,
    HttpClientModule
  ]
})
export class LoginLineModule { }
