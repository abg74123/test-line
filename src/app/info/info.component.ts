import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../core/environment.prod";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  profile$: any = new BehaviorSubject({})

  constructor(private router: HttpClient, private route: Router) {
  }

  ngOnInit(): void {

    liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = liff.getProfile()
        console.log("profile => ", profile)
        this.profile$.next(profile)
      } else {
        liff.login()
      }
    })

  }


  async back() {

    const profile = await liff.getProfile()

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
         'Connection': 'keep-alive',
        'Content-Type': 'application/json'
    });

      const body = {
      userId:profile.userId,
      richId:"richmenu-bcd8213aaf142aad621cb024d978555c"
    }

    this.router.post("https://api-line.netlify.app/.netlify/functions/api/rich/user", {...body}, {headers:headers}).subscribe(() => {
            this.route.navigate(['/register'])
    })

  }
}
