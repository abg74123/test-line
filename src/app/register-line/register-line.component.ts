import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-line',
  templateUrl: './register-line.component.html',
  styleUrls: ['./register-line.component.css']
})

export class RegisterLineComponent implements OnInit {
  profile$: any = new BehaviorSubject(null)


  constructor(private router: HttpClient, private route: Router) {
  }

  ngOnInit(): void {
    liff.init({liffId: '2002624343-g6braWW3', withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = liff.getProfile()
        console.log("profile => ", profile)
        this.profile$.next(profile)
      }else{
        const destinationUrl = 'https://main--flourishing-starburst-61ab72.netlify.app/register'
        liff.login({redirectUri: destinationUrl})
      }
    })

  }

  async register() {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer kli5TWfWl9rzwCNy/zjVBTFadcvrVZ1cBIzuGpd7vPwo6U8rhpScH1OEBgXClYZEcsjUJ82xzJGGQisZ0D2KNMzm5NwTZ0ZdBTb4Bf1uc63sceiRaVEHK+co1R3lWFSdbtLGhE7G3CWWt1YBQvBdKgdB04t89/1O/w1cDnyilFU='
    });
    const profile = await liff.getProfile()

    this.router.post('https://api.line.me/v2/bot/user/' + profile.userId + '/richmenu/richmenu-8b0d07862a0779f538e3bf152c38cce2', {}, {headers: httpHeaders}).subscribe(res => {
      this.route.navigate(['/info'])
    })

  }

  logout(){
    liff.logout()
  }


}
