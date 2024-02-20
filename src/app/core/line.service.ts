import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, from, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LineService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  options = {
    headers: this.headers
  };

  port = 'https://api-line.netlify.app/.netlify/functions/api'

  private lineToken = new BehaviorSubject(null)
  lineToken$ = this.lineToken.asObservable()

  constructor(private http: HttpClient) {
  }

  get getLineToken() {
    console.log('#### getLineToken ####')
    const line = localStorage.getItem('line')
    if (line) {
      this.lineToken.next(JSON.parse(line))
    }
    return this.lineToken$
  }

  getBotInfo() {
    console.log('#### getBotInfo ####')
    const line: any = this.getLineTokenValue
    console.log({line})

    if (line) {
      const info$ = this.http.get(this.port + `/bot/info?client_id=${line.channelIdMessaging}&client_secret=${line.channelSecretMessaging}`, this.options).pipe(
        map((res: any) => res.data),
      )
      const followers$ = this.http.get(this.port + `/bot/insight/followers?date=${20191231}&client_id=${line.channelIdMessaging}&client_secret=${line.channelSecretMessaging}`, this.options).pipe(
        map((res: any) => res.data),
      )

      const joinData: Observable<{ info: any, followers: any }> = forkJoin({info: info$, followers: followers$})
      return joinData
    } else {
      return of(null)
    }

  }

  validateChannel(val: any) {
    console.log('#### validateChannel ####')
    const line: any = this.getLineTokenValue
    console.log({line})

    if (line) {
      return this.http.post(this.port + `/validate/token`, {
        client_id: val.channelIdMessaging,
        client_secret: val.channelSecretMessaging,
        access_token: val.channelAccessToken,
      }, this.options).pipe(
        map((res: any) => res.data),
      )
    } else {
      return of(null)
    }


  }

  getMemberDetail(userId: string) {
    return this.http.get(`https://ppujvvtbkb.execute-api.ap-southeast-1.amazonaws.com/beta/gappslip/member/${userId}`).pipe(
      map((res: any) => res.data)
    )
  }

  createMember(userId: string, body: any) {
    return this.http.post(`https://ppujvvtbkb.execute-api.ap-southeast-1.amazonaws.com/beta/gappslip/member/register/${userId}`, {...body})
  }

  changeRichMenu(userId: string, richId: string = "richmenu-fbcc1945518a048e9957cadb539ce56b") {
    return this.http.post(`https://ppujvvtbkb.execute-api.ap-southeast-1.amazonaws.com/beta/gappslip/member/${userId}/richmenu/${richId}`, {})
  }


  set setLineToken(value: any) {
    console.log('#### setLineToken ####')
    localStorage.setItem('line', JSON.stringify(value))
    this.lineToken.next(value)
  }

  get getLineTokenValue() {
    console.log('#### getLineTokenValue ####')
    return this.lineToken.getValue()
  }

  sendBroadcastMessage(message: string) {
    console.log('#### sendBroadcastMessage ####')
    const line: any = this.getLineTokenValue
    console.log({line})
    return this.http.post(this.port + '/broadcast/messages', {
      message: message,
      client_id: line.channelIdMessaging,
      client_secret: line.channelSecretMessaging,
    }, this.options)
  }

  getUsers() {
    console.log('#### getUsers ####')
    const line: any = this.getLineTokenValue
    console.log({line})
    if (line) {
      return this.http.get(this.port + `/list/users?client_id=${line.channelIdMessaging}&client_secret=${line.channelSecretMessaging}`, this.options).pipe(
        map((res: any) => res.data),
        tap(res => console.log('users => ', res))
      )
    } else {
      return of(null)
    }
  }

  getMessages(userId: string) {
    console.log('#### getMessages ####')
    const line: any = this.getLineTokenValue
    console.log({line})

    if (line) {
      return this.http.get(this.port + `/messages/${userId}?client_id=${line.channelIdMessaging}&client_secret=${line.channelSecretMessaging}`, this.options).pipe(
        map((res: any) => res.data),
        tap(res => console.log('messages => ', res))
      )
    } else {
      return of(null)
    }
  }
}
