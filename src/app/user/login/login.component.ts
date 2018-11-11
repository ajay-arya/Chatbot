import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { isRegExp } from 'util';
import { and } from '@angular/router/src/utils/collection';
import { ServerService } from '../../service/server.service';

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
  mov;
  constructor(private router: Router, public render: Renderer2, public el: ElementRef, private server: ServerService) { }

  ngOnInit() {
    this.Uname = '';
    this.password = '';

    this.server.getUsersDetail();
    this.mov = this.el.nativeElement.getElementsByClassName('color')[0];
    if (this.server.logfromsign === true) {
      this.server.logfromsign = false;
      this.render.addClass(this.mov, 'tt');
    } else {
      setTimeout(() => {
        this.render.addClass(this.mov, 'tt');
      }, 5);
    }
  }

  signup() {
    this.render.addClass(this.mov, 'move');
    setTimeout(() => {
      this.router.navigate(['signup']);
    }, 500);
  }

  login() {
    const finish = this.el.nativeElement.getElementsByClassName('Acenter')[0];
    let flag = 0;
    if (this.Uname.length === 0) {
      this.validUN = '*Enter a User Name';
      this.usernameValidation = true;
    } else if (this.password.length === 0) {
      this.validPS = '*Enter a Password';
      this.passwordValidation = true;
    } else {
      for (const i of this.user) {
        if (i.uname === this.Uname) {
          if (i.password === this.password) {
            flag = 1;
          }
        }
      }
      if (flag === 0) {
        this.userValidation = true;
      } else {
        this.render.addClass(finish, 'dis');
        this.render.addClass(this.mov, 'move');
        setTimeout(() => {
          this.render.addClass(this.mov, 'move-half');
        }, 500);
        setTimeout(() => {
          this.server.logedin = true;
          this.router.navigate(['Chatbot']);
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
      const pattern = /[A-Za-z0-9]$/;

      if (data === ' ') {
        this.validUN = '*No Spaces are allowed';
        this.usernameValidation = !this.usernameValidation;
        this.Uname = this.Uname.trim();
      } else if (!pattern.test(data) && data !== '-') {
        this.validUN = '*Special charecters are not allowed';
        this.usernameValidation = !this.usernameValidation;
        this.Uname = this.Uname.slice(0, -1);
      }
    } else if (flag === 2) {
      this.passwordValidation = false;
    }
  }

}
