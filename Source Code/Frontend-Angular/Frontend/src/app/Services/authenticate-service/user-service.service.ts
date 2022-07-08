import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewUser } from '../../Models/NewUser.models';
import { SignUp } from '../../Models/SignUp.model';
import { ForgotPassword } from '../../Models/ForgotPassword.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  baseUrl: string = "http://localhost:8094";
   

  /*
  This service methos is used to send request to the given url and perform user login operation based on the credentials entered by the user
  */
  userLogin(user:NewUser){
    return this.http.post<any>(this.baseUrl + "/authenticate",user,{responseType:'text' as 'json'}).pipe(catchError(this.handleError));
   }

   /*
   This service method is used to send request to the given url and perform the sign uo operation based on the form data entered by the customer
   */
   signUp(sign_up:SignUp){
     return this.http.post<any>(this.baseUrl+"/signup",sign_up,{responseType:"text" as "json"}).pipe(catchError(this.handleError));
   }

   /*
   This service method is used to send request to the given url and do user verification for forgot password page by using the information entered by the user
   */
   forgotPassword(forgotPassword:ForgotPassword){
     return this.http.post<any>(this.baseUrl+"/forgotPassword",forgotPassword,{responseType:"text" as "json"}).pipe(catchError(this.handleError));
   }

   /*
   This service method is used to send request to the given url and reset the password with the data entered by the user
   */
   resetPassword(changePassword:ForgotPassword){
    return this.http.post<any>(this.baseUrl+"/changePassword",changePassword,{responseType:"text" as "json"}).pipe(catchError(this.handleError));
  }

  /*
  This  method is used to handle the exceptions that might be received
  */
  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
