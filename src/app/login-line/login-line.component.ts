import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import liff from "@line/liff";

@Component({
  selector: 'app-login-line',
  templateUrl: './login-line.component.html',
  styleUrls: ['./login-line.component.css']
})
export class LoginLineComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    liff.init({liffId:'2002624343-g6braWW3'})
    if(liff.isLoggedIn()){
      const profile = liff.getProfile()
      console.log("profile => ",profile)
    }else{
      liff.login()
    }
  }

  login(){

    this.http.get(' https://api.line.me/oauth2/v2.1/authorize').subscribe((res:any) => console.log("login => ",res))

  }
}
