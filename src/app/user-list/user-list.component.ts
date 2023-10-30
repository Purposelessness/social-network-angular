import {Component, OnInit} from '@angular/core';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {UserInfo} from '../types/user-info';
import {HelperService} from '../services/helper.service';
import {captureMessage} from '@sentry/angular-ivy';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users?: UserInfo[];

  private uid?: bigint;

  constructor(
    private readonly userInfoProviderService: UserInfoProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.uid = this.helper.getUid();
    this.getUsers();
  }

  private getUsers(): void {
    this.userInfoProviderService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => BigInt(user.id) !== this.uid);
      },
      error: (e) => captureMessage('Error when getting users', 'error'),
    });
  }
}
