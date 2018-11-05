import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Message } from '../../model/message.model';
import { ChatService } from '../../service/chat/chat.service';

import { AfterViewChecked, ViewChild} from '@angular/core'

@Component({
  selector: 'app-dialogflow',
  templateUrl: './dialogflow.component.html',
  styleUrls: ['./dialogflow.component.scss']
})
export class DialogflowComponent implements OnInit {
  messages: Message[] = [];
  content:string;

  left = true;
  right = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

  constructor(private chat: ChatService, public el: ElementRef, public render: Renderer2) { }

  ngOnInit() {
    let message = new Message("Welcome to Chatbot", "assets/images/bot.png", new Date(), this.left, this.right);
    this.messages.push(message);
    this.scrollToBottom();    
  }

  sendMessage(data) {
    this.left = !this.left;
    this.right = !this.right;
    // const disable = this.el.nativeElement.getElementsByClassName('chatinput')[0];
    // this.render.addClass(disable, 'dis');
    let message = new Message(data, "assets/images/user.png", new Date(), this.left, this.right);
    this.messages.push(message);
    this.left = !this.left;
    this.right = !this.right;
    this.chat.sendMessage(data).subscribe(res => {
      console.log(res);
      let message = new Message(res.result.speech, "assets/images/bot.png", new Date(), this.left, this.right);
      this.messages.push(message);
      data = "";
      this.content = "";
      // this.render.removeClass(disable, 'dis');
      this.scrollToBottom();      
    })
  }

}
