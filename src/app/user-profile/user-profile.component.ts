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
  public userInfo?: UserInfo;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userInfoProviderService: UserInfoProviderService,
  ) {
  }

  public ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr == null) {
      console.error('id is not set');
      return;
    }

    const id = BigInt(idStr);
    this.userInfoProviderService.getUserInfo(id).subscribe({
      next: (userInfo) => {
        this.userInfo = userInfo
      },
      error: (e) => console.error(e),
    });
  }
}
