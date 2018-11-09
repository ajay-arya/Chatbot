import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { crypting } from '../../model/crypting';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  sendData;
  allok = false;
  clearflag = false;
  pass = [];
  new = false;
  Fname = '';
  Uname = '';
  Email = '';
  password = '';
  Cpassword = '';
  validFN = false;
  validUN = false;
  validEM = false;
  validPS = false;
  validCP = false;
  sub = 'Confirm';
  mesFN;
  mesUN;
  mesEM;
  mesPS;
  mesCP;
  set;
  userValidationFlag = 0;
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
  pointer = true;

  validFill = false;
  newUserName = false;
  mes = ' *Fill all details';

  constructor(private router: Router, public el: ElementRef, public render: Renderer2) { }

  ngOnInit() {
    this.set = 0;
    this.sendData = {};
    this.newUserName = false;
  }
  login() {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];

    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

  signup() {
    let pattern;
    this.set = 0;
    if (!this.clearflag) {
      if ((this.Fname.length === 0) || (this.Uname.length === 0) || (this.Email.length === 0) || (this.password.length === 0)) {
        this.validFill = true;
      } else {
        pattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
        if (!pattern.test(this.Email)) {
          this.mesEM = '*Enter valid E-mail';
          this.validEM = true;
        } else {
          pattern = /[A-Z]+$/;
          if (this.password.length < 6) {
            this.mesPS = '*Atleast 6 charecter required';
            this.validPS = true;

          } else {
            if (!this.check(pattern, this.password, 1)) {
              this.mesPS = '*Password must have one Upper case charecter.';
              this.validPS = true;

            } else {
              pattern = /[^a-zA-Z]+$/;
              if (!this.check(pattern, this.password, 1)) {
                this.mesPS = 'Password must should have one non-aphabetic charecter.';
                this.validPS = true;
              } else {
                this.allClear();
              }
            }
          }

        }
      }
    } else {
      if (this.allok) {
        console.log(this.password);
        this.pass = crypting.encryption(this.password);

        this.sendData = {
          fullName: this.Fname,
          userName: this.Uname,
          Email: this.Email,
          password: this.pass
        };

        console.log('data:', this.sendData);
        const temp: string = crypting.decryption(this.pass);
        console.log(temp);

      } else {
        this.mesCP = '*Password missmatch!';
        this.validCP = true;
      }
    }

  }

  validate(data, flag) {
    if (data !== 'Enter') {
      this.validFill = false;

      this.validPS = false;
    }
    let pattern;

    if (flag === 1) {
      this.validFN = false;
      pattern = /[A-Za-z]$/;
      if (!pattern.test(data) && data !== ' ') {
        this.mesFN = '*Only Charecters are Allowed';
        this.validFN = !this.validFN;
        this.Fname = this.Fname.slice(0, -1);
      }
    } else if (flag === 2) {
      this.validUN = false;
      pattern = /[A-Za-z0-9]$/;

      if (data === ' ') {
        this.mesUN = '*No Spaces are allowed';
        this.validUN = !this.validUN;
        this.Uname = this.Uname.trim();
      } else if (!pattern.test(data) && data !== '-') {
        this.mesUN = '*Only \'-\' allowed';
        this.validUN = !this.validUN;
        this.Uname = this.Uname.slice(0, -1);
      }
      if (this.Uname.length <= 5) {
        this.mesUN = '*username must have 6 charecters';
        this.validUN = true;
      }
      this.userValidate();
      if (this.userValidationFlag !== 0) {
        if (this.checkUser()) {
          this.validUN = false;
          this.newUserName = true;
        } else {
          this.mesUN = '*username already exist!';
          this.validUN = true;
          this.newUserName = false;
        }
      }
    } else if (flag === 3) {
      this.validEM = false;
    } else if (flag === 5) {
      this.validCP = false;
      if (this.newUserName) {
        this.validCP = false;
        if (this.Cpassword.length === 0) {
          this.mesCP = '*Enter Conformation Password';
          this.validCP = true;
        } else if (this.Cpassword !== this.password) {
          this.mesCP = '*Password Not Matching!';
          this.validCP = true;
        } else {
          this.allok = true;
        }
      } else {
        this.mesCP = '*Please confirm username!';
        this.validCP = true;
      }
      // pattern = /[A-Za-z0-9]+.@[a-z]+.[a-z]$/;
    }


  }

  checkUser() {
    let flag = 0;
    this.pointer = !this.pointer;
    for (const i of this.user) {
      if (this.Uname === i.uname) {
        flag = 1;
      }
    }
    if (flag === 0) {
      return true;
    } else { return false; }

  }

  userValidate() {
    if (this.Uname.length >= 6) {
      this.userValidationFlag = 1;
    } else {
      this.userValidationFlag = 0;
      this.mesUN = '*username must have atleast 6 Charecters.';
      this.validUN = true;
    }
  }

  check(pat, data, check) {
    let flag = 0;
    if (check === 1) {
      for (let i = 0; i < data.length; i++) {
        if (pat.test(data[i])) {
          flag = 1;
        }
      }
      if (flag === 0) {
        return (false);
      } else { return (true); }
    }
  }

  allClear() {
    this.clearflag = true;

    this.sub = 'Submit';
    this.set = 1;
    const cover = this.el.nativeElement.getElementsByClassName('form-group')[0];
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    const show = this.el.nativeElement.getElementsByClassName('form-groupc')[0];

    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.render.addClass(cover, 'dis');
      this.render.removeClass(show, 'dis');
      this.render.addClass(mov, 'remove');
      setTimeout(() => {
        this.render.removeClass(mov, 'move');
      }, 500);
    }, 500);
  }

}
