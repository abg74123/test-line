import { Component } from '@angular/core';
import {LineService} from "../../core/line.service";
import {BehaviorSubject, tap} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  messages$:any = new BehaviorSubject([])
  users$:any = this.core.getUsers()

  constructor(private core:LineService) {
  }

  selectUser(userId:string){
    this.core.getMessages(userId).pipe(
      tap(message => this.messages$.next(message))
    ).subscribe()
  }
}
