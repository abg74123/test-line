import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../core/environment.prod";

@Component({
  selector: 'app-register-line',
  templateUrl: './register-line.component.html',
  styleUrls: ['./register-line.component.css']
})



export class RegisterLineComponent implements OnInit {
  profile$: any = new BehaviorSubject(null)

  formRegister:any = {
      blockedNote: "",
      compId: "",
      customerCode: "",
      customerCompanyContactInfo: undefined,
      customerContactInfo: {
            address: undefined,
            emails: [],
            firstName: "",
            fullName: "",
            lastName: "",
            mobiles: [],
            note: "",
            personPic: "",
            prefixName: "",
            shippingAddress: [],
            social: undefined,
            tags: [],
            taxNo: ""
      },
      customerNote: "",
      isBlocked: false,
      isMember: false,
      orderType: undefined,
      socialContact: [],
      tags: [],
      wasVendor: false
}


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

  async register() {

    const profile = await liff.getProfile()

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json'
    });

    const body = this.formRegister

    this.router.post(`https://ppujvvtbkb.execute-api.ap-southeast-1.amazonaws.com/beta/gappslip/member/register/${profile.userId}`, {...body}, {headers: headers}).subscribe(() => {
      this.route.navigate(['/info'])
    })

  }

  logout() {
    liff.logout()
    liff.closeWindow()
  }


}
