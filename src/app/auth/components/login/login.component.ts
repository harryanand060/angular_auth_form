import { Component, OnInit } from '@angular/core';
import { IAuthMethod } from '../../interfaces/auth-method.interface';
import { AuthService } from '../../services/api/auth.service';
import { HelperService } from '../../services/utils/helper.service';
import { FormGroupService } from '../../services/validation/form-group.service';
import {TokenService} from '../../../shared/services/token.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, IAuthMethod {
  public formGroup: any
  public mobile_icon: boolean;
  public isLoading: boolean = false;

  constructor(private formGroupService: FormGroupService, private authService: AuthService) {
    this.createForm()
  }

  ngOnInit(): void {
    this.onChange()
  }

  /**
   * form
   */
  public get form() {
    return this.formGroup.controls
  }

  /**
   * createForm
   */
  public createForm() {
    this.formGroup = this.formGroupService.loginFormGroup
  }

  /**
   * getError
   */
  public getError(key: string) {
    return this.formGroupService.getValidationMessage(this.form, key)
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true
      this.authService.login(this.formGroup.value)
        .subscribe(
          res => {
            res.data ? TokenService.setToken(res.data.token)  : console.error(res.message)
            this.isLoading = false
          },
          error => { console.log(error) },
          () => { console.log('completed') }
        )
    }
  }


  /**
   * onChange
   */
  public onChange(): void {
    this.formGroup.get("device").valueChanges
      .subscribe((arg: string) => {
        this.mobile_icon = HelperService.check_email_mobile(arg) == 'mobile' ? true : false
      });
  }

}
