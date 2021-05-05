import { Component, OnInit } from '@angular/core';
import { IAuthMethod } from '../../interfaces/auth-method.interface';
import { HelperService } from '../../services/utils/helper.service';
import { FormGroupService } from '../../services/validation/form-group.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit,IAuthMethod {
  public formGroup:any
  public mobile_icon: boolean;
  
  constructor(private formGroupService: FormGroupService) {
    this.createForm();
   }

  ngOnInit(): void {
    this.onChange();
  }

  /**
   * createForm
   */
  public createForm() {
    this.formGroup = this.formGroupService.forgetPasswordFormGroup  
  }

  /**
   * form
   */
  public get form() {
    return this.formGroup.controls
  }

  /**
   * name
   */
  public getError(key:string) {
    return this.formGroupService.getValidationMessage(this.form, key)
  }

  /**
   * onSubmit
   */
  public onSubmit() {
     console.log(this.formGroup.valid);
  }

  /**
   * onChange
   */
   public onChange(): void {
    this.formGroup.get("device").valueChanges
      .subscribe((arg: string) => {
        console.log(this.mobile_icon)
        this.mobile_icon = HelperService.check_email_mobile(arg) == 'mobile' ? true : false
        
      });
  }

}
