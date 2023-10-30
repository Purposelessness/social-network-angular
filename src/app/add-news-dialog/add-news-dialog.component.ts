import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {getErrorMessage} from '../utility/form';
import {NewsProviderService} from '../services/news-provider.service';
import {HelperService} from '../services/helper.service';
import {captureMessage} from '@sentry/angular-ivy';

@Component({
  selector: 'app-add-news-dialog',
  templateUrl: './add-news-dialog.component.html',
  styleUrls: ['./add-news-dialog.component.scss'],
})
export class AddNewsDialogComponent {
  public form: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<AddNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly newsProviderService: NewsProviderService,
    private readonly helper: HelperService,
  ) {
  }

  public getErrorMessage(formControl: string): string {
    return getErrorMessage(this.form, formControl);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      captureMessage('Invalid add-news-dialog form', 'info');
      return;
    }
    const uid = this.helper.getUid();
    this.newsProviderService.addNews(uid, this.form.value.message).subscribe({
      next: () => {
        captureMessage('Successfully added news', 'debug');
        this.dialogRef.close(this.form.value.message);
      },
      error: (error) => captureMessage('Error when adding news', 'error'),
    });
  }
}
