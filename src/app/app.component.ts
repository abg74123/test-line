import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";

liff.init({liffId:'2002624343-g6braWW3',withLoginOnExternalBrowser: true})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
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
