import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Uname;
  password;
  usernameValidation = false;

  constructor(private router: Router, public render: Renderer2, public el:ElementRef) { }

  ngOnInit() {  }

  signup()  {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['signup']);
    }, 500);
  }

  login() {
    console.log(this.Uname);
    console.log(this.password);
    // this.router.navigate(['Chatbot']);
  }

}
