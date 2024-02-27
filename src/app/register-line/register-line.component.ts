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
        console.log("profile  => ", profile)
        this.profile$.next(profile)
      }else{
        liff.login()
      }
    })

  }

  async register() {

    const profile = await liff.getProfile()

      const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
    });

    const body = {
      userId:profile.userId,
      richId:"richmenu-35b373981196a03521cb4cf7a80f669d"
    }

    this.router.post("https://api-line.netlify.app/.netlify/functions/api/rich/user", {...body},{headers:headers}).subscribe(() => {
            this.route.navigate(['/info'])
    })

  }

  logout(){
    liff.logout()
    liff.closeWindow()
  }


}
