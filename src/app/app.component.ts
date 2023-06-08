import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LineService} from "./core/line.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  channeld: string = '1657879221'
  channelSecret: string = '5df738274847d01d22354ee989df341b'
  formLine: FormGroup
  isConnect = false
  connection$ = this.core.getLineToken.pipe(
    tap((res:any) => {
      console.log({res})
      if(res){
        this.formLine.setValue({
          channelIdMessaging: res.channelIdMessaging,
          channelSecretMessaging: res.channelSecretMessaging,
          channelAccessToken: res.channelAccessToken,
          channelWebhook: res.channelWebhook,
          lineId: res.lineId
        })
        this.isConnect = true
      }
    })
  )

  botInfo$ = this.core.getBotInfo()

  constructor(private fb: FormBuilder,private core:LineService) {
    this.formLine = this.fb.group({
      channelIdMessaging: this.channeld,
      channelSecretMessaging: this.channelSecret,
      channelAccessToken: 'i1pQkBiSb1u7xOjTy43W29S3GDfYCSxy76mY38kMZY2KsuxgeUXDvhjQLlSMMXKPcsjUJ82xzJGGQisZ0D2KNMzm5NwTZ0ZdBTb4Bf1uc61LVu0xU7V3r/q2O6uYFvBDwQv18SwaGVLPlSXCRuZn4AdB04t89/1O/w1cDnyilFU=',
      channelWebhook: 'https://api-line.netlify.app/.netlify/functions/api/webhook',
      lineId: '@045jjife'
    })

  }


  submitForm() {
    this.core.validateChannel(this.formLine.value).pipe(
      tap(() => this.core.setLineToken = this.formLine.value)
    ).subscribe()
  }
}
