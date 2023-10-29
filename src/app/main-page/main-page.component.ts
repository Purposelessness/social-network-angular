import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {AuthPopupComponent} from '../auth-popup/auth-popup.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  public openAuthPopup(): void {
    let dialogRef = this.dialog.open(AuthPopupComponent, {
      width: '400px',
    });
  };
}
