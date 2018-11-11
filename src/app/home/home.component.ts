import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat/chat.service';
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
  flag = true;

  constructor(private router: Router, private chat: ChatService,
    public el: ElementRef, public render: Renderer2, private server: ServerService) { }

  ngOnInit() {
    this.displayDetails = this.el.nativeElement.getElementsByClassName('details')[0];
    this.data = 'Press \'TAB\' and Type \'CHAT\' to continue';
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
    if (k[l - 1] === 'T' && k[l - 2] === 'A' && k[l - 3] === 'H' && k[l - 4] === 'C') {
      console.log('asd');
      if (this.server.logedin) {
        this.router.navigate(['Chatbot']);
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  detailPage() {
    if (this.flag) {
      this.render.removeClass(this.displayDetails, 'dis');
    } else {
      this.render.addClass(this.displayDetails, 'dis');
    }
    this.flag = !this.flag;
  }

}
