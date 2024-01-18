import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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

    liff.init({liffId: '2002624343-g6braWW3', withLoginOnExternalBrowser: true}).then(async () => {
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
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer kli5TWfWl9rzwCNy/zjVBTFadcvrVZ1cBIzuGpd7vPwo6U8rhpScH1OEBgXClYZEcsjUJ82xzJGGQisZ0D2KNMzm5NwTZ0ZdBTb4Bf1uc63sceiRaVEHK+co1R3lWFSdbtLGhE7G3CWWt1YBQvBdKgdB04t89/1O/w1cDnyilFU=');
    const profile = await liff.getProfile()

    this.router.post('https://api.line.me/v2/bot/user/' + profile.userId + '/richmenu/richmenu-ad65167ebbde22b64698adfa74c2fc50', {}, {headers: headers}).subscribe(res => {
      this.route.navigate(['/info'])
    })

  }
}
