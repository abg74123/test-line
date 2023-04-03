import { Injectable } from '@angular/core';
import {BehaviorSubject, from, tap} from "rxjs";
import {pluck} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LineService {

  port = 'https://api-line.netlify.app/.netlify/functions/api'

  private lineToken = new BehaviorSubject(null)
  lineToken$ = this.lineToken.asObservable()

  constructor(private http:HttpClient) { }

  get getLineToken(){
    const line = localStorage.getItem('line')
    if(line){
      this.lineToken.next(JSON.parse(line))
    }
    return this.lineToken$
  }

  set setLineToken(value:any){
    localStorage.setItem('line',JSON.stringify(value))
    this.lineToken.next(value)
  }


  sendBroadcastMessage(message:string){
    const line:any = this.lineToken.getValue()
    console.log({line})
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })

    let options = {
      headers
    };

    return this.http.post(this.port+'/broadcast/messages',{
        message:message,
        channelAccessToken:line.channelAccessToken
      },options)
  }

  getUsers(){

    const line:any = this.lineToken.getValue()
    console.log({line})
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })

    let options = {
      headers
    };

    return this.http.get(this.port+`/list/users?channelAccessToken=${line.channelAccessToken}`,options).pipe(
      pluck('data'),
      tap(res => console.log('users => ',res))
    )
  }


  getMessages(userId:string){
    const line:any = this.lineToken.getValue()
    console.log({line})
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })

    let options = {
      headers
    };

    return this.http.get(this.port+`/messages/${userId}?channelAccessToken=${line.channelAccessToken}`,options).pipe(
      pluck('data'),
      tap(res => console.log('messages => ',res))
    )
  }
}
