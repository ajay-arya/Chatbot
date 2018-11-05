import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public render: Renderer2, public el:ElementRef) { }

  ngOnInit() {
  }

  signup()  {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['signup']);
    }, 500);
  }

  login() {
    this.router.navigate(['dialog']);
  }

}
