import {Component, OnInit} from '@angular/core';

import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  public friendInfos: UserInfo[] = [];

  private readonly userId: bigint = BigInt(0);

  constructor(
    private readonly userInfoProviderService: UserInfoProviderService,
  ) {
  }

  public ngOnInit(): void {
    this.getFriendInfos();
  }

  private getFriendInfos(): void {
    this.userInfoProviderService.getFriends(this.userId).subscribe({
      next: (friendIds) => {
        if (friendIds.length === 0) {
          console.log('no friends');
          return;
        }

        this.userInfoProviderService.getUsersInfo(friendIds).subscribe({
          next: (friendInfos) => {
            this.friendInfos = friendInfos;
          },
          error: (e) => console.error(e),
        });
      },
      error: (e) => console.error(e),
    });
  }
}
