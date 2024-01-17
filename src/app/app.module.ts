import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import liff from "@line/liff";

liff.init({liffId:'2002624343-g6braWW3',withLoginOnExternalBrowser: true})
@NgModule({
  declarations: [
    AppComponent
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
export class AppModule {

   ngOnInit(): void {
    if(liff.isLoggedIn()){
      console.log("---login success---")
      const profile = liff.getProfile()
      console.log("profile => ",profile)
    }else{
      liff.login()
    }
  }
}
