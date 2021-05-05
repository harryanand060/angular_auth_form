import { Component, OnInit } from '@angular/core';
import { IAuthMethod } from '../../interfaces/auth-method.interface';
import { FormGroupService } from '../../services/validation/form-group.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, IAuthMethod {
  public formGroup: any
  public hide: boolean
  
  constructor(private formGroupService: FormGroupService) { }

  ngOnInit(): void {
    this.hide = true
    this.createForm();
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
    this.formGroup = this.formGroupService.registerFormGroup
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
    console.log(this.formGroup.valid);
  }
}
