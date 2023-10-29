import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserInfo} from '../types/user-info';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public uid?: bigint;
  public userInfo?: UserInfo;
  public userNewsIdList?: bigint[];
  public ownProfile = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.getUid();
    this.getUserInfo();
    this.getUserNewsIdList();
  }

  private getUid(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const idStr = params.get('id');
        if (idStr == null) {
          this.redirectToUserProfile();
          return;
        }

        this.uid = BigInt(idStr);

        if (this.uid == this.helper.getUid()) {
          this.ownProfile = true;
        }
      },
    );
  }

  private redirectToUserProfile(): void {
    const uid = this.helper.getUid();
    const _ = this.router.navigateByUrl(`/user/${uid}`);
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
