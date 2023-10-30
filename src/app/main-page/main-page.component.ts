import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {AuthPopupComponent} from '../auth-popup/auth-popup.component';
import {DOMAIN} from '../consts/clients';
import {HelperService} from '../services/helper.service';
import {Role} from '../types/user-info';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public DOMAIN: string = DOMAIN;
  public role?: Role;

  constructor(
    private readonly dialog: MatDialog,
    private readonly helper: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.role = this.helper.getRole();
  }

  public openAuthPopup(): void {
    let dialogRef = this.dialog.open(AuthPopupComponent, {
      width: '400px',
    });
  };

  protected readonly Role = Role;
}
