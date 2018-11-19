import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { crypting } from './../model/crypting';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import 'rxjs/Rx';
// import { Obervable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = 'http://localhost:3000/';
  logedin = false;
  logfromsign = false;
  uname = 'ajay123';
  loginUser: any;

  user = [];
  reviews = [];

  constructor(private http: Http, private router: Router) { }

  getUsersDetail() {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      this.http.get(this.url + 'user')
        .subscribe(
          (response) => {
            const data = response.json();
            this.update(data);
          }
        );
  }
  update(data) {
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        for (const j of data[i]) {
          this.user.push(j);
        }
      }
    }
    // for (const i in this.user) {
    //   if (this.user.hasOwnProperty(i)) {
    //     console.log(this.user[i].password);
    //     const pass = crypting.decryption(this.user[i].password);
    //     this.user[i].password = pass;
    //   }
    // }
    // console.log(this.user);
  }



  postUsersDetail(data) {
    this.http.post(this.url + 'user', data).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      });
  }

  postReviewDetail(data) {
    this.http.post(this.url + 'review', data).subscribe(
      (response) => {
        // this.router.navigate(['/login']);
      });
  }

  getReviews()  {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.http.get(this.url + 'review')
      .subscribe(
        (response) => {
          const data = response.json();
          console.log(data);
          this.updateReview(data);
        }
      );
  }

  updateReview(data)  {
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        for (const j of data[i]) {
          this.reviews.push(j);
        }
      }
    }
    console.log(this.reviews);
  }
}
