import {Component, OnInit} from '@angular/core';
import liff from "@line/liff";
import {BehaviorSubject} from "rxjs";
import {environment} from "../core/environment.prod";
import {LineService} from "../core/line.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  profile$: any = new BehaviorSubject({})

  constructor(private lineService: LineService) {
  }

  ngOnInit(): void {
    // liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true}).then(async () => {
    //   if (liff.isLoggedIn()) {
    //     const profile = await liff.getProfile()
    //     console.log("profile => ", profile)
    //     this.profile$ = this.lineService.getMemberDetail(profile.userId)
    //   } else {
    //     liff.login()
    //   }
    // })
  }

  async logout() {
    const profile = await liff.getProfile()
    this.lineService.changeRichMenu(profile.userId, "richmenu-3aa1b3897e05403bd05428b3076dc610").subscribe(
      {
        complete: () => {
          liff.logout()
          liff.closeWindow()
        }
      }
    )
  }
}
