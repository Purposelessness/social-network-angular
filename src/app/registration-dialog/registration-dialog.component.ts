import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {getErrorMessage} from '../utility/form';
import {AuthProxyControllerService} from '../services/auth-proxy-controller.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('',
      [Validators.required, Validators.email, Validators.pattern(/\w+@\w+\.\w+/)]),
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  public hidePassword = true;

  constructor(
    private readonly dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly authProxyControllerService: AuthProxyControllerService,
  ) {
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      console.info('invalid form');
      return;
    }
    this.authProxyControllerService.register({
      name: `${this.form.value.firstName} ${this.form.value.surname}`,
      birthDate: this.form.value.birthDate.toISOString().split('T')[0],
      email: this.form.value.email,
      login: this.form.value.login,
      password: this.form.value.password,
    }).subscribe({
      next: () => {
        console.log('successfully registered');
        this.dialogRef.close();
      },
      error: (error) => console.log(error),
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(formControl: string): string {
    return getErrorMessage(this.form, formControl);
  }
}
