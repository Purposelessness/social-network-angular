import {Component, OnInit} from '@angular/core';
import {UserInfoProviderService} from '../services/user-info-provider.service';
import {UserInfo} from '../types/user-info';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users?: UserInfo[];

  constructor(private readonly userInfoProviderService: UserInfoProviderService) {
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userInfoProviderService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (e) => console.error(e),
    });
  }
}
