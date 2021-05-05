import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private authService: AuthService) { }

  public confirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): any => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (!control || !matchingControl) {
        return null;
      }
      if (matchingControl.errors && !matchingControl.errors.confirmPassword) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  public unique(control: AbstractControl) {
    return this.authService.userExist(control.value).pipe(
      map(res => {
        return res.data.user_exists  ? { user_exists: true } : null
      })
    )
  }

  public userExists(control: AbstractControl) {
    return this.authService.userExist(control.value).pipe(
      map(res => {
        return res.data.user_exists ? null : { not_found: true }
      })
    )
  }

}
