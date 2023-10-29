import {Component, OnInit} from '@angular/core';

import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  public friendInfos: UserInfo[] = [];
  private userId: bigint = 0n;

  constructor(
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.getUserId();
    this.getFriendInfos();
  }

  private getUserId(): void {
    this.userId = this.helper.getUid();
  }

  private getFriendInfos(): void {
    this.userInfoProviderService.getFriends(this.userId).subscribe({
      next: (friendIds) => {
        if (friendIds.length === 0) {
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
