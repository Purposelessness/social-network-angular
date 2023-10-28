import {Component, Input} from '@angular/core';

import {UserInfo} from '../types/user-info';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() userInfo?: UserInfo;
}
