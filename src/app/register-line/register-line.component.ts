import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {concat, map} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../core/environment.prod";
import {LineService} from "../core/line.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-line',
  templateUrl: './register-line.component.html',
  styleUrls: ['./register-line.component.css'],
})


export class RegisterLineComponent implements OnInit {
  loading = true

  formRegister: any = this.fb.group({
    address: "",
    emails: this.fb.array(['']),
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobiles: this.fb.array(['']),
    personPic: "",
    prefixName: ['', Validators.required],
  })


  constructor(private fb: FormBuilder, private route: Router, private lineService: LineService) {
  }

  async ngOnInit() {
    await liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true})
    if (liff.isLoggedIn()) {

      // * Get Profile Line
      const profile = await liff.getProfile()
      console.log("profile =>  ", profile)

      // * patch value image
      this.formRegister.get('personPic').patchValue(profile.pictureUrl)

      /**
       * Get Member Fount:
       * if true => Change Rich Menu And Redirect To ...
       * if false => return Erro (end)
       */

        // ^ Get Member Detail
      const getMemberDetail$ = this.lineService.getMemberDetail(profile.userId).pipe(
          map(member => {
            if (!member) {
              throw new Error("member not fount");
            }
          })
        )
      // ^ Change Rich Menu
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
  }

  async register() {
    console.log('register')
    console.log("formRegister valid => ", this.formRegister.valid)
    if (this.formRegister.valid) {
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
    } else {
      this.formRegister.get('prefixName').markAsTouched()
      this.formRegister.get('firstName').markAsTouched()
      this.formRegister.get('lastName').markAsTouched()
    }
  }

}
