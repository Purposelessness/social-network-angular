import {Component} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {AuthPopupComponent} from './auth-popup/auth-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Social network';

  constructor(private readonly dialog: MatDialog) {
  }

  public openAuthPopup(): void {
    let dialogRef = this.dialog.open(AuthPopupComponent, {
      width: '400px',
    });
  };
}
