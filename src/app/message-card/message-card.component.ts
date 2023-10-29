import {Component, Input} from '@angular/core';

import {Message} from '../types/chat';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
})
export class MessageCardComponent {
  @Input() message?: Message;
}
