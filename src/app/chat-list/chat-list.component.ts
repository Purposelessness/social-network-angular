import {Component, OnInit} from '@angular/core';

import {Chat} from '../types/chat';
import {ChatProviderService} from '../services/chat-provider.service';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  public chats?: Chat[];

  constructor(
    private readonly chatProviderService: ChatProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.getChats();
  }

  private getChats(): void {
    const uid = this.helper.getUid();
    this.chatProviderService.getUserChats(uid).subscribe({
      next: (chats) => this.chats = chats,
      error: (e) => console.error(e),
    });
  }
}
