import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'https://api.dialogflow.com/v1/query';
  ourtoken = '0a34012fc68046a7b5c16393f85586c7';

  constructor(private http: Http) { }

  sendMessage(message)  {
    console.log('cha');
    
    let data = {
      lang: 'en',
      sessionId: '12345',
      query: message
    }
    
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + this.ourtoken);
    
    return this.http.post(this.url, data, {headers: headers}).pipe(map((res: any) =>{
      return res.json();
    }));
  }
}
