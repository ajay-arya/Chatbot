import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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

  validFill = false;
  mes = ' *Fill all details';

  constructor(private router: Router, public el: ElementRef, public render: Renderer2) { }

  ngOnInit() {
  }
  login() {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];

    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

  signup() {
    var pattern;

    if ((this.Fname.length === 0) || (this.Uname.length === 0) || (this.Email.length === 0) || (this.password.length === 0)) {
      this.validFill = true;
    } else {
      pattern = /[A-Za-z0-9]+@[a-z]+.[a-z]+$/;
      if (!pattern.test(this.Email)) {
        this.mesEM = 'Enter valid E-mail';
        this.validEM = true;
      } else {
        this.sub = 'Submit';
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
        console.log('asd');
      }
    }

  }

  validate(data, flag) {
    if (data !== 'Enter') {
      this.validFill = false;
      this.validEM = false;
    }
    var pattern;
    this.validFN = false;
    this.validUN = false;
    this.validPS = false;
    this.validCP = false;

    if (flag == 1) {
      pattern = /[A-Za-z]$/;
      if (!pattern.test(data) && data !== ' ') {
        this.mesFN = "*Only Charecters are Allowed";
        this.validFN = !this.validFN;
        this.Fname = this.Fname.slice(0, -1);
      }
    } else if (flag === 2) {
      pattern = /[A-Za-z0-9]$/;

      if (data === ' ') {
        this.mesUN = '*No Spaces are allowed';
        this.validUN = !this.validUN;
        this.Uname = this.Uname.trim();
      } else if (!pattern.test(data) && data !== '-') {
        this.mesUN = "*Special charecters are not allowed";
        this.validUN = !this.validUN;
        this.Uname = this.Uname.slice(0, -1);
      }
    } else if (flag == 3) {
      // pattern = /[A-Za-z0-9]+.@[a-z]+.[a-z]$/;
    }

  }

}
