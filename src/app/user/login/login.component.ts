import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { isRegExp } from 'util';
import { and } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Uname: string;
  password;
  usernameValidation = false;
  passwordValidation = false;
  userValidation = false;
  validUN;
  validPS;
  user: any = [{
    uname: 'ajay-arya',
    password: 'ajay123'
  }, {
    uname: 'abc',
    password: 'ajay123'
  }, {
    uname: '1',
    password: '2'
  }];
  constructor(private router: Router, public render: Renderer2, public el: ElementRef) { }

  ngOnInit() {
    this.Uname = "";
    this.password = '';
  }

  signup() {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['signup']);
    }, 500);
  }

  login() {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    const finish = this.el.nativeElement.getElementsByClassName('Acenter')[0];
    var flag = 0;
    if (this.Uname.length === 0) {
      this.validUN = '*Enter a User Name';
      this.usernameValidation = true;
    } else if (this.password.length === 0) {
      this.validPS = '*Enter a Password';
      this.passwordValidation = true;
    } else {
      for (var i of this.user) {
        // console.log(i);
        if (i.uname === this.Uname)
          if (i.password === this.password) {
            flag = 1;
          }
      }
      if (flag === 0) {
        this.userValidation = true;
      } else {
        this.render.addClass(finish, 'dis');
        this.render.addClass(mov, 'move');
        setTimeout(() => {
          this.render.addClass(mov, 'move-half');
        }, 500);
        setTimeout(() => {
          this.router.navigate(['signup']);
          // this.router.navigate(['Chatbot']);
        }, 1250);
      }
    }
  }

  validate(data, flag) {
    if (data !== 'Enter') {
      this.userValidation = false;
    }

    this.usernameValidation = false;
    if (flag === 1) {
      var pattern = /[A-Za-z0-9]$/;

      if (data === ' ') {
        this.validUN = '*No Spaces are allowed';
        this.usernameValidation = !this.usernameValidation;
        this.Uname = this.Uname.trim();
      } else if (!pattern.test(data) && data !== '-') {
        this.validUN = "*Special charecters are not allowed";
        this.usernameValidation = !this.usernameValidation;
        this.Uname = this.Uname.slice(0, -1);
      }
    } else if (flag === 2) {
      this.passwordValidation = false;
    }
  }
  
}
