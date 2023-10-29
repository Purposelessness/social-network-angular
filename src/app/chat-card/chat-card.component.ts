import {Component, Input} from '@angular/core';

import {Chat} from '../types/chat';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent {
  @Input() chat?: Chat;
}
