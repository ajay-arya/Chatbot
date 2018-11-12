import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Message } from '../../model/message.model';
import { ChatService } from '../../service/chat/chat.service';

import { AfterViewChecked, ViewChild } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogflow',
  templateUrl: './dialogflow.component.html',
  styleUrls: ['./dialogflow.component.scss']
})
export class DialogflowComponent implements OnInit {
  messages: Message[] = [];
  content: string;

  left = true;
  right = false;
  hoverBox = false;
  cimg;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  constructor(private router: Router, private chat: ChatService,
    public el: ElementRef, public render: Renderer2, private server: ServerService) { }

  ngOnInit() {
    this.cimg = this.el.nativeElement.getElementsByClassName('cimg')[0];
    if (this.server.logedin === false) {
      const mov = this.el.nativeElement.getElementsByClassName('chatform')[0];
      const add = this.el.nativeElement.getElementsByClassName('login')[0];

      this.render.addClass(mov, 'dis');
      this.render.removeClass(add, 'dis');
    }
    const message = new Message('Welcome to Chatbot', 'assets/images/bot.png', new Date(), this.left, this.right);
    this.messages.push(message);
    this.scrollToBottom();
  }

  sendMessage(data) {
    this.left = !this.left;
    this.right = !this.right;
    const message = new Message(data, 'assets/images/user.png', new Date(), this.left, this.right);
    this.messages.push(message);
    this.left = !this.left;
    this.right = !this.right;
    this.chat.sendMessage(data).subscribe(res => {
      console.log(res);
      const botMessage = new Message(res.result.speech, 'assets/images/bot.png', new Date(), this.left, this.right);
      this.messages.push(botMessage);
      data = '';
      this.content = '';
      this.scrollToBottom();
    });
  }

  resend() {
    this.router.navigate(['/login']);
  }

  hover() {
    this.render.addClass(this.cimg, 'chatimgh');
    setTimeout(() => {
      this.render.addClass(this.cimg, 'chatimgb');
      setTimeout(() => {
        this.render.removeClass(this.cimg, 'chatimgb');
        this.render.removeClass(this.cimg, 'chatimgh');
      }, 500);
    }, 200);
  }

  sendhover() {
    const btn = this.el.nativeElement.getElementsByClassName('bt')[0];
    if (this.hoverBox) {
      this.render.addClass(btn, 'bth');
    } else {
      this.render.removeClass(btn, 'bth');
    }
  }
  logout() {
    if (confirm('Are you sure ?')) {
      this.server.logedin = false;
      this.router.navigate(['']);
    }
  }

}
