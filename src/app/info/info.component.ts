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
    liff.init({liffId: environment.liffId, withLoginOnExternalBrowser: true}).then(async () => {
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        console.log("profile => ", profile)
        this.profile$ = this.lineService.getMemberDetail(profile.userId)
      } else {
        liff.login()
      }
    })
  }

  async logout() {
    const profile = await liff.getProfile()
    this.lineService.changeRichMenu(profile.userId, "richmenu-7b43436f329b4429e1ee55cb393b3649").subscribe(
      {
        complete: () => {
          liff.logout()
          liff.closeWindow()
        }
      }
    )
  }
}
