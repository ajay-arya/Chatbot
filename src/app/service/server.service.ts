import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import { Obervable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = 'localhost:3000/';
  logedin = false;
  logfromsign = false;

  constructor(private http: Http) { }

  getUsersDetail() {
    console.log('come');
    return !this.http.get(this.url).pipe(map(Response => {
      console.log('data: ', Response);
    })).subscribe(data => {
      console.log((data));
    });
    // return this.http.get(this.rootURL + 'api/mainquiz')
    // const headers = new Headers({
    //   'Content-Type': 'application/json'
    // });

    // this.http.get(this.url) .pipe(map(data => {})).subscribe(result => {
    //   console.log(result);
    // });
  }
}
