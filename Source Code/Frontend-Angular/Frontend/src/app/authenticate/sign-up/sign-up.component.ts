import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
// import { CustomValidator } from 'src/custom-validator';
// import { CustomValidator2 } from 'src/custom-validator2';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../Services/authenticate-service/user-service.service';
import { User } from '../../../Models/User.model';
import { Address1 } from '../../../Models/Address.model';
import { SignUp } from '../../../Models/SignUp.model';
import { CustomValidator } from '../../../../custom-validator';
import { CustomValidator2 } from '../../../../custom-validator2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;
  user:User={
    customerName:undefined,
    emailId:undefined,
    password:undefined,
    security_question:undefined,
    security_answer:undefined,
    mobileNumber:undefined
  }
  address:Address1;
  signup:SignUp={
    user:undefined,
    address:undefined
  }
  msg: String;
  errormsg: String;;

  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserServiceService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidator.patternValidator(/[?=.*/'":;<>~|[\]{}\\!@#$%^&()]/, { hasSpecialCharacters: true })
      ])],
      phonenumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[6-9][0-9]{9}"),
        CustomValidator2.patternValidator(/[?=.*/'":;<>~|[\]{}\\!@#$%^&()]/, { hasSpecialCharacters: true }),
        CustomValidator2.patternValidator(/[A-Za-z]/, { hasLetters: true })
      ])],
      question:['',Validators.required],
      answer:['',Validators.required],
      city:[''],
      landmark:[''],
      line1:[''],
      line2:[''],
      emailid: ['', [Validators.required, Validators.email]],
      name: ['', Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/^([A-Z][a-z0-9?=.*/'":;<>~|[\]{}\\!@#$%^&()]*((\s[A-Za-z])?[a-z0-9?=.*/'":;<>~|[\]{}\\!@#$%^&()])*)$/, { hasCapitalCase: true }),
        CustomValidator2.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator2.patternValidator(/[?=.*/'":;<>~|[\]{}\\!@#$%^&()]/, { hasSpecialCharacters: true })
      ])]
    });
  }

/*
This method is called when the user submits the form and the request is sent and response received
from the server
*/
  verify(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    else {
          this.user.customerName=this.addForm.controls.name.value;
          this.user.emailId=this.addForm.controls.emailid.value;
          this.user.mobileNumber=this.addForm.controls.phonenumber.value;
          this.user.password=this.addForm.controls.password.value;
          this.user.security_answer=this.addForm.controls.answer.value;
          this.user.security_question=this.addForm.controls.question.value;

          if(this.addForm.controls.city.value&&this.addForm.controls.landmark.value&&this.addForm.controls.line1.value&&this.addForm.controls.phonenumber.value)
          {
            this.address={
              line1:undefined,
              line2:undefined,
              landmark:undefined,
               city:undefined,
                mobileNumber:undefined
             }
          this.address.city=this.addForm.controls.city.value;
          this.address.landmark=this.addForm.controls.landmark.value;
          this.address.line1=this.addForm.controls.line1.value;
          this.address.line2=this.addForm.controls.line2.value;
          this.address.mobileNumber=this.addForm.controls.phonenumber.value;
          this.signup.address=this.address;
          }

          this.signup.user=this.user;
          this.signup.address=this.address;
          this.userService.signUp(this.signup).subscribe(data => {
            this.msg=data;
            alert(this.msg);
            this.router.navigate(['/authenticate']);
          },
            err => {
              this.errormsg=err.error;
              alert(this.errormsg);
            });
      }
       

    }
  }
  
