import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {getErrorMessage} from '../utility/form';
import {AuthProxyControllerService} from '../services/auth-proxy-controller.service';
import {captureMessage} from '@sentry/angular-ivy';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  public form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  public hidePassword = true;

  constructor(
    private readonly dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly authProxyControllerService: AuthProxyControllerService,
  ) {
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      captureMessage('Invalid auth-dialog form', 'info');
      return;
    }
    this.authProxyControllerService.login({
      login: this.form.value.login,
      password: this.form.value.password,
    }).subscribe({
      next: () => {
        captureMessage('Successfully logged in', 'debug');
        this.dialogRef.close();
      },
      error: (error) => captureMessage('Error when logging in', 'error'),
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(formControl: string): string {
    return getErrorMessage(this.form, formControl);
  }
}
