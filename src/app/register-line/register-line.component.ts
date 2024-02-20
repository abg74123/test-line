import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject, concat, map} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../core/environment.prod";
import {LineService} from "../core/line.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-line',
  templateUrl: './register-line.component.html',
  styleUrls: ['./register-line.component.css'],
})


export class RegisterLineComponent implements OnInit {
  loading = true

  formRegister = this.fb.group({
    blockedNote: "",
    compId: "",
    customerCode: "",
    customerCompanyContactInfo: undefined,
    customerContactInfo: this.fb.group({
      address: undefined,
      emails: this.fb.array(['']),
      firstName: "",
      fullName: ['', Validators.required] ,
      lastName: ['', Validators.required] ,
      mobiles: this.fb.array(['']),
      note: "",
      personPic: "",
      prefixName: ['', Validators.required],
      shippingAddress: [],
      social: undefined,
      tags: [],
      taxNo: ""
    }),
    customerNote: "",
    isBlocked: false,
    isMember: false,
    orderType: undefined,
    socialContact: [],
    tags: [],
    wasVendor: false
  })


  constructor(private fb: FormBuilder, private route: Router, private lineService: LineService) {
  }

  ngOnInit(): void {
    liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        console.log("profile => ", profile)

        const getMemberDetail$ = this.lineService.getMemberDetail(profile.userId).pipe(
          map(member => {
            if (!member) {
              throw new Error("member not fount");
            }
          })
        )
        const changeRichMenu$ = this.lineService.changeRichMenu(profile.userId)

        concat(getMemberDetail$, changeRichMenu$).subscribe(
          {
            error: (err) => {
              this.loading = false;
              console.error(err)
            },
            complete: () => {
              // this.route.navigate(['/info'])
              window.location.href = 'https://dev-slip.gapp-biz.com/'
            }
          }
        )

      } else {
        liff.login()
      }
    })
  }

  get formCustomerContactInfo() {
    return this.formRegister.get("customerContactInfo") as any
  }

  async register() {
    console.log('register')
    console.log("formRegister valid => ",this.formRegister.valid)
    // if (this.formRegister.valid) {
      const profile = await liff.getProfile()
      const body = this.formRegister.value
      console.log({body})
      const createMember$ = this.lineService.createMember(profile.userId, body)
      const changeRichMenu$ = this.lineService.changeRichMenu(profile.userId)

      concat(createMember$, changeRichMenu$).subscribe(
        {
          complete: () => {
            // this.route.navigate(['/info'])
            window.location.href = 'https://dev-slip.gapp-biz.com/'
          }
        }
      )
    // }else{
    //  this.formCustomerContactInfo.get('prefixName').markAsTouched()
    //  this.formCustomerContactInfo.get('firstName').markAsTouched()
    //  this.formCustomerContactInfo.get('lastName').markAsTouched()
    // }
  }

}
