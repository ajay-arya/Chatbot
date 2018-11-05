import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { ChatService } from '../../service/chat/chat.service';

@Component({
  selector: 'app-dialogflow',
  templateUrl: './dialogflow.component.html',
  styleUrls: ['./dialogflow.component.scss']
})
export class DialogflowComponent implements OnInit {
  messages: Message[] = [];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    let message = new Message("Welcome to Chatbot", "assets/images/bot.png", new Date());
    this.messages.push(message);
  }

  sendMessage(data) {
    let message = new Message(data.value, "assets/images/user.png", new Date());
    this.messages.push(message);
    this.chat.sendMessage(data.value).subscribe(res => {
      console.log(res);
      let message = new Message(res.result.speech, "assets/images/bot.png", new Date());
      this.messages.push(message);
      data.value = "";
    })
  }

}
