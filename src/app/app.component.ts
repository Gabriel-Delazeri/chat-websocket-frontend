import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {UsernameInputComponent} from "./components/username-input/username-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    UsernameInputComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  message: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(message => {
      this.messages.push(JSON.parse(message.body));
    });
  }

  sendMessage(): void {
    const username = localStorage.getItem('username');
    if (this.message.trim() && username) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  protected readonly localStorage = localStorage;
}
