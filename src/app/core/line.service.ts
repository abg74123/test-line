import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, from, map, Observable, tap} from "rxjs";
import {pluck} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LineService {

   headers = new HttpHeaders({
    'Content-Type' : 'application/json'
  })

   options = {
    headers:this.headers
  };

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

  getBotInfo(channelAccessToken:string){
    const info$ = this.http.get(this.port+`/bot/info?channelAccessToken=${channelAccessToken}`,this.options).pipe(
      map((res:any) => res.data),
    )
    const followers$ = this.http.get(this.port+`/bot/insight/followers?date=${20191231}&channelAccessToken=${channelAccessToken}`,this.options).pipe(
      map((res:any) => res.data),
    )

    const joinData:Observable<{info:any,followers:any}> = forkJoin({info:info$,followers:followers$})
    return joinData
  }




  set setLineToken(value:any){
    localStorage.setItem('line',JSON.stringify(value))
    this.lineToken.next(value)
  }

  get getLineTokenValue(){
    return this.lineToken.getValue()
  }

  sendBroadcastMessage(message:string){
    const line:any = this.getLineTokenValue
    console.log({line})

    return this.http.post(this.port+'/broadcast/messages',{
        message:message,
        channelAccessToken:line.channelAccessToken
      },this.options)
  }

  getUsers(){

    const line:any = this.getLineTokenValue
    console.log({line})

    return this.http.get(this.port+`/list/users?channelAccessToken=${line.channelAccessToken}`,this.options).pipe(
      pluck('data'),
      tap(res => console.log('users => ',res))
    )
  }

  getMessages(userId:string){
    const line:any = this.getLineTokenValue
    console.log({line})

    return this.http.get(this.port+`/messages/${userId}?channelAccessToken=${line.channelAccessToken}`,this.options).pipe(
      pluck('data'),
      tap(res => console.log('messages => ',res))
    )
  }
}
