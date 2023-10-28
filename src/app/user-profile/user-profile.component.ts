import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public uid?: bigint;
  public userInfo?: UserInfo;
  public userNewsIdList?: bigint[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userInfoProviderService: UserInfoProviderService,
  ) {
  }

  public ngOnInit(): void {
    this.getUid();
    this.getUserInfo();
    this.getUserNewsIdList();
  }

  private getUid(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr == null) {
      console.error('id is not set');
      return;
    }

    this.uid = BigInt(idStr);
  }

  private getUserInfo(): void {
    if (this.uid == null) {
      return;
    }

    this.userInfoProviderService.getUserInfo(this.uid).subscribe({
      next: (userInfo) => {
        this.userInfo = userInfo
      },
      error: (e) => console.error(e),
    });
  }

  private getUserNewsIdList(): void {
    if (this.uid == null) {
      return;
    }

    this.userInfoProviderService.getNewsListIds(this.uid).subscribe({
        next: (newsIds) => this.userNewsIdList = newsIds,
        error: (e) => console.error(e),
      },
    );
  }
}
