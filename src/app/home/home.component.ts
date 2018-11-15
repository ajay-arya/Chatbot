import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hoverBox = false;
  data = '';
  message;
  displayDetails;
  displayDetailsBtn = 'Details';
  flag = false;

  constructor(private render: Renderer2, private el: ElementRef, private router: Router,
    private server: ServerService) { }

  ngOnInit() {
    this.transforms();
    // const me = this.el.nativeElement.getElementsByClassName('himes')[0];
    // this.render.addClass(me, 'mo1');
    // setTimeout(() => {
    //   this.render.addClass(me, 'mo');
    // }, 100);
    this.data = 'Press \'TAB\' and Type \'CHAT\' to continue';
    // this.displayDetails = this.el.nativeElement.getElementsByClassName('details');
  }

  login() {
    this.router.navigate(['login']);
  }

  sendhover() {
    const btn = this.el.nativeElement.getElementsByClassName('vr')[0];
    if (this.hoverBox) {
      this.render.addClass(btn, 'bth');
    } else {
      this.render.removeClass(btn, 'bth');
    }
  }

  key() {
    const flag = 'CHAT';
    this.data = this.message;
    const f = this.data.toString();
    let k = '';
    k = f.toUpperCase();
    const l = k.length;
    if (this.data === '') {
      this.data = 'Type \'CHAT\' to continue';
    }
    if (k[l - 1] === 'T' && k[l - 2] === 'A' && k[l - 3] === 'H' && k[l - 4] === 'C') {
      if (this.server.logedin) {
        this.router.navigate(['Chatbot']);
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  detailPage() {
    const details = this.el.nativeElement.getElementsByClassName('d')[0];
    this.displayDetailsBtn = 'Hide';
    this.flag = !this.flag;
    if (this.flag) {
      this.displayDetailsBtn = 'Hide';
      setTimeout(() => {
        this.render.addClass(details, 'dM');
      }, 10);
    } else {
      this.displayDetailsBtn = 'Details';
      setTimeout(() => {
      }, 10);
    }
  }

  transforms() {
    const img = this.el.nativeElement.getElementsByClassName('img')[0];
    const imgte = this.el.nativeElement.getElementsByClassName('text1')[0];
    const hr = this.el.nativeElement.getElementsByClassName('hr')[0];

    setTimeout(() => {
      this.render.addClass(img, 'imgM');
      this.render.addClass(imgte, 'text1M');
      this.render.addClass(hr, 'hrM');
    }, 10);
  }
}
