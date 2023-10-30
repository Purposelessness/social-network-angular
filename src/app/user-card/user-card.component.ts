import {Component, Input} from '@angular/core';

import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {HelperService} from '../services/helper.service';
import {ChatProviderService} from '../services/chat-provider.service';
import {DOMAIN} from '../consts/clients';
import {captureMessage} from '@sentry/angular-ivy';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() userInfo?: UserInfo;
  @Input() useNameAsLink = false;
  @Input() showActions = true;

  public readonly DOMAIN: string = DOMAIN;

  constructor(
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly chatProviderService: ChatProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public onAddUser() {
    const myUid = this.helper.getUid();
    this.userInfoProviderService.addFriend(myUid, this.userInfo!.id).subscribe({
      next: () => captureMessage('Successfully added friend', 'debug'),
      error: (e) => captureMessage(`Error when adding user: ${e}`, 'error'),
    });
  }

  public onCreateChat() {
    const myUid = this.helper.getUid();
    this.chatProviderService.createChat([myUid, this.userInfo!.id]).subscribe({
      next: () => captureMessage('Successfully created chat', 'debug'),
      error: (e) => captureMessage(`Error when creating chat: ${e}`, 'error'),
    });
  }
}
