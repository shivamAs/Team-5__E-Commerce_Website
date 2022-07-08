import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../../../Models/NewUser.models';
import { UserServiceService } from '../../../Services/authenticate-service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean= false;
  invalidLogin:boolean = false;
  msg:String;
  errormsg:String;
  user:NewUser={
    emailId:undefined,
    password:undefined
  };
  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserServiceService) { }

  ngOnInit() {
    if(localStorage.email||localStorage.emailId||localStorage.password){
      localStorage.removeItem("email");
      localStorage.removeItem("emailId");
      localStorage.removeItem("password");
    }
    this.loginForm = this.formBuilder.group({
      emailId:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /*
  This method is called when the user submits the form by pressing on login button and it 
  sends request to the service method where the request is sent and the response is received from the server.
  */

  verifyLogin(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    let email = this.loginForm.controls.emailId.value;
    let password = this.loginForm.controls.password.value;
  
   this.user.emailId=email;
   this.user.password=password;
    this.userService.userLogin(this.user).subscribe(data => {
      this.msg= data;
      localStorage.email=email;
      // localStorage.password=password;
      if(this.msg=="Admin")
    {
      this.router.navigate(['/admin']);
    }
    else if(this.msg=="Customer")
    {
      this.router.navigate(['/customer']);
    } 
    },
      err => {
        this.errormsg=err.error;
        this.invalidLogin = true;
        alert(this.errormsg);
      });
    
  } 
}

