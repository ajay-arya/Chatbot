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
    const cover = this.el.nativeElement.getElementsByClassName('Acenter')[0];

    // this.render.addClass(cover, 'bk');
    this.render.removeClass(cover, 'dis');
    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

  signup() {

    if((this.Fname.length === 0) || (this.Uname.length === 0) || (this.Email.length === 0) || (this.password.length === 0)) {
      this.validFill = true;
    } else {
      
    }

  }

  validate(data, flag) {

  }

}
