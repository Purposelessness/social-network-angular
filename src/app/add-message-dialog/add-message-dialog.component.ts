import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {captureMessage} from '@sentry/angular-ivy';

import {HelperService} from '../services/helper.service';
import {getErrorMessage} from '../utility/form';
import {ChatProviderService} from '../services/chat-provider.service';

@Component({
  selector: 'app-add-message-dialog',
  templateUrl: './add-message-dialog.component.html',
  styleUrls: ['./add-message-dialog.component.scss'],
})
export class AddMessageDialogComponent {
  @Input() public chatId?: bigint;

  public form: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<AddMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly chatProviderService: ChatProviderService,
    private readonly helper: HelperService,
  ) {
    this.chatId = data.chatId;
  }

  public getErrorMessage(formControl: string): string {
    return getErrorMessage(this.form, formControl);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (!this.chatId) {
      captureMessage('No chat id in add-message-dialog form', 'info');
      return;
    }
    if (this.form.invalid) {
      captureMessage('Invalid add-message-dialog form', 'info');
      return;
    }

    const uid = this.helper.getUid();
    this.chatProviderService.addMessageToChat(this.chatId, {
      chatId: this.chatId.toString(),
      authorId: uid.toString(),
      text: this.form.value.message as string,
      date: (new Date()).toISOString().split('.')[0],
    }).subscribe({
      next: () => {
        captureMessage('Successfully added news', 'debug');
        this.dialogRef.close(this.form.value.message);
      },
      error: (error) => captureMessage('Error when adding message to chat', 'error'),
    });
  }
}
