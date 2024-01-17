import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";

liff.init({liffId:'2002624343-g6braWW3',withLoginOnExternalBrowser: true})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  profile$ = new BehaviorSubject({})
ngOnInit(): void {
    if(liff.isLoggedIn()){
      console.log("---login success---")
      const profile = liff.getProfile()
      console.log("profile => ",profile)
      this.profile$.next(profile)
    }else{
      liff.login()
    }
  }
}
