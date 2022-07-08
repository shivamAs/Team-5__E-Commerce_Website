import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from '../../../Models/ForgotPassword.model';
import { CustomValidator } from '../../../../custom-validator';
import { UserServiceService } from '../../../Services/authenticate-service/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  submitted: boolean;
  resetForm: FormGroup;
  message:String;
  changePassword:ForgotPassword={
    emailId:undefined,
    security_question:undefined,
    security_answer:undefined,
    newPassword:undefined,
    reEnterNewPassword:undefined
  }
  errormsg: String;
  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserServiceService) { }

  ngOnInit() {
    if (!(localStorage.emailId)) {
      this.router.navigate(['']);
    }
    this.resetForm=this.formBuilder.group({
      reEnterPassword:['',Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidator.patternValidator(/[?=.*/'":;<>~|[\]{}\\!@#$%^&()]/, { hasSpecialCharacters: true })
      ])]
    })
  }

/*
This method is called when the user submits the form and the request is sent and response received
from the server
*/
  verify(){
    this.submitted=true;
    if(this.resetForm.invalid){
      return;
    }
    else{
      this.changePassword.newPassword=this.resetForm.controls.password.value;
      this.changePassword.reEnterNewPassword=this.resetForm.controls.reEnterPassword.value;
      this.changePassword.emailId=localStorage.emailId;
      this.userService.resetPassword(this.changePassword).subscribe(data=>
        {
          this.message=data;
          alert(this.message);
          localStorage.removeItem("emailId");

        },err=>{
          this.errormsg=err.error;
      alert(this.errormsg);
        }
      )
      
    }
  }
  back(){
    this.router.navigate(['/authenticate']);
  }

}
