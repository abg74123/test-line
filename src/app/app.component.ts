import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profile$: any = new BehaviorSubject({})

  ngOnInit(): void {
    liff.init({liffId: '2002624343-g6braWW3', withLoginOnExternalBrowser: true}).then(async ()=>{
      if (liff.isLoggedIn()) {
      console.log("---login success---")
      const profile = liff.getProfile()
      console.log("profile => ", profile)
      this.profile$.next(profile)
    } else {
      liff.login()
    }
    })
  }

  logout() {
    liff.logout()
  }
}
