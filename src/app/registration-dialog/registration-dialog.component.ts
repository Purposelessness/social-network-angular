import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {getErrorMessage} from '../utility/form';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  public hidePassword = true;

  constructor(
    private readonly dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      console.info('invalid form');
      return;
    }
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(formControl: string): string {
    return getErrorMessage(this.form, formControl);
  }
}
