import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject, concat, concatMap, map} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../core/environment.prod";
import {LineService} from "../core/line.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-register-line',
  templateUrl: './register-line.component.html',
  styleUrls: ['./register-line.component.css']
})


export class RegisterLineComponent implements OnInit {
  profile$: any = new BehaviorSubject(null)

  formRegister: any = {
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


  constructor(private route: Router, private lineService: LineService) {
  }

  ngOnInit(): void {
    liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        console.log("profile => ", profile)

        const getMemberDetail$ = this.lineService.getMemberDetail(profile.userId).pipe(
          map(member => {
            if(!member.data){
              throw error("member not fount")
            }
          })
        )
        const changeRichMenu$ = this.lineService.changeRichMenu(profile.userId)

        concat(getMemberDetail$, changeRichMenu$).subscribe(
          {
            complete: () => {
              this.route.navigate(['/info'])
            }
          }
        )
        this.profile$.next(profile)
      } else {
        liff.login()
      }
    })

  }

  async register() {

    const profile = await liff.getProfile()
    const body = this.formRegister
    const createMember$ = this.lineService.createMember(profile.userId, body)
    const changeRichMenu$ = this.lineService.changeRichMenu(profile.userId)

    concat(createMember$, changeRichMenu$).subscribe(
      {
        complete: () => {
          this.route.navigate(['/info'])
        }
      }
    )

  }


}
