import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LineService} from "../../core/line.service";

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent {

  message = ""

  constructor(private core:LineService) {
  }

  sendBroadcast(){
    console.log('### sendBroadcast ###')
      this.core.sendBroadcastMessage(this.message).subscribe()
  }

}
