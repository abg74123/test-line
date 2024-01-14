import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLineRoutingModule } from './login-line-routing.module';
import { LoginLineComponent } from './login-line.component';


@NgModule({
  declarations: [LoginLineComponent],
  imports: [
    CommonModule,
    LoginLineRoutingModule
  ]
})
export class LoginLineModule { }
