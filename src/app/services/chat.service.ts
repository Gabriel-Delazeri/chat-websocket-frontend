import { Injectable } from '@angular/core';
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompService: StompService;
  private username: string | null = localStorage.getItem('username');

  constructor() {
    const stompConfig: StompConfig = {
      url: 'ws://192.168.21.12:8080/ws',
      headers: {},
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };
    this.stompService = new StompService(stompConfig);
  }

  public sendMessage(message: string): void {
    if (this.username) {
      const payload = {
        sender: this.username,
        content: message
      };
      this.stompService.publish('/app/chat.sendMessage', JSON.stringify(payload));
    }
  }

  public getMessages(): Observable<any> {
    return this.stompService.subscribe('/topic/public');
  }
}
