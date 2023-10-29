import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Chat} from '../types/chat';
import {ChatProviderService} from '../services/chat-provider.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chat?: Chat;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly chatProviderService: ChatProviderService,
  ) {
  }

  public ngOnInit(): void {
    this.getChat();
  }

  private getChat(): void {
    const chatIdStr = this.route.snapshot.paramMap.get('id');
    if (!chatIdStr) {
      console.error('no chatId');
      return;
    }
    const chatId = BigInt(chatIdStr);
    this.chatProviderService.getChats([chatId]).subscribe({
      next: (chat) => this.chat = chat[0],
      error: (e) => console.error(e),
    });
  }
}
