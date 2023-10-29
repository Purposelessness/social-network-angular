import {Component, Input} from '@angular/core';

import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() userInfo?: UserInfo;
  @Input() useNameAsLink = false;
  @Input() showActions = true;

  constructor(
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public onAddUser() {
    const myUid = this.helper.getUid();
    this.userInfoProviderService.addFriend(myUid, this.userInfo!.id).subscribe({
      next: () => console.log('successfully added friend'),
      error: (e) => console.error(e),
    });
  }
}
