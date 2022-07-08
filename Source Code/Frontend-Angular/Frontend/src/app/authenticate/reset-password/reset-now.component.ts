import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from '../../../Models/ForgotPassword.model';
import { UserServiceService } from '../../../Services/authenticate-service/user-service.service';

@Component({
  selector: 'app-reset-now',
  templateUrl: './reset-now.component.html',
  styleUrls: ['./reset-now.component.css']
})
export class ResetNowComponent implements OnInit {
  forgotForm:FormGroup;
  submitted: boolean=false;
  message:String;
  errormsg:String;
  forgot_password:ForgotPassword={
    emailId:undefined,
    security_question:undefined,
    security_answer:undefined,
    newPassword:undefined,
    reEnterNewPassword:undefined
  }
  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserServiceService) { }

  ngOnInit()
     {
       if(localStorage.emailId){
         localStorage.removeItem("emailId");
       }
    this.forgotForm=this.formBuilder.group({
      question:['',Validators.required],
      answer:['',Validators.required],
      emailId:['',[Validators.required,Validators.email]]
  });
}

/*
This method is called when the user submits the form and the request is sent and response received 
from the server
*/
verifyUser(){
  this.submitted = true;
  if(this.forgotForm.invalid){
    return;
  }
  else{
    this.forgot_password.emailId=this.forgotForm.controls.emailId.value;
    this.forgot_password.security_question=this.forgotForm.controls.question.value;
    this.forgot_password.security_answer=this.forgotForm.controls.answer.value;
    this.userService.forgotPassword(this.forgot_password).subscribe(data=>{
      this.message=data;
      if(this.message=="User"){
        localStorage.emailId=this.forgotForm.controls.emailId.value;
        this.router.navigate(['/authenticate/reset-password1']);
      }
    },
    err=>{
      this.errormsg=err.error;
      alert(this.errormsg);
    }
    )
  }
}
}

