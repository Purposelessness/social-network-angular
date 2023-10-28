import {FormGroup} from '@angular/forms';

export function getErrorMessage(form: FormGroup, formControl: string): string {
  const control = form.get(formControl);
  if (control == null) {
    throw new Error(`Control ${formControl} is not found`);
  }
  if (control.hasError('required')) {
    return 'You must enter a value';
  }
  if (control.hasError('email')) {
    return 'Not a valid email';
  }
  if (control.hasError('minlength')) {
    return `Min length is ${control.getError('minlength').requiredLength}`;
  }
  return 'Invalid value';
}
