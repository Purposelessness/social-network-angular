import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';

import {Chat, Message} from '../types/chat';
import {ChatProviderService} from '../services/chat-provider.service';
import {MatDialog} from '@angular/material/dialog';
import {AddMessageDialogComponent} from '../add-message-dialog/add-message-dialog.component';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {UserInfo} from '../types/user-info';

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
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.getChat();

    this.chatProviderService.getMessageStream().subscribe({
      next: (message) => {
        if (this.chat?.id === message.chatId) {
          this.fillMessageAuthorName(message);
          this.chat!.messages.push(message);
        }
      },
      error: (e) => console.error(e),
    });
  }

  private getChat(): void {
    const chatIdStr = this.route.snapshot.paramMap.get('id');
    if (!chatIdStr) {
      console.error('no chatId');
      return;
    }
    const chatId = BigInt(chatIdStr);
    this.chatProviderService.getChats([chatId]).subscribe({
      next: (chat) => {
        this.chat = chat[0];
        this.fillAuthorName(this.chat);
      },
      error: (e) => console.error(e),
    });
  }

  private fillAuthorName(chat: Chat): void {
    const promises: Observable<UserInfo>[] = [];
    for (const message of chat.messages) {
      promises.push(this.userInfoProviderService.getUserInfo(message.authorId));
    }
    forkJoin(promises).subscribe({
      next: (users) => {
        for (let i = 0; i < users.length; i++) {
          chat.messages[i].authorName = users[i].name;
        }
      },
      error: (e) => console.error(e),
    });
  }

  private fillMessageAuthorName(message: Message): void {
    this.userInfoProviderService.getUserInfo(message.authorId).subscribe({
      next: (user) => {
        message.authorName = user.name;
      },
      error: (e) => console.error(e),
    });
  }

  public openAddMessagePopup(): void {
    let dialogRef = this.dialog.open(AddMessageDialogComponent, {
      width: '400px',
      data: {
        chatId: this.chat?.id,
      },
    });
  }
}
