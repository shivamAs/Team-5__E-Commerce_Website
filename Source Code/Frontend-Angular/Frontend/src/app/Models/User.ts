
import { CarryBox } from './CarryBox';
import { Address } from './Address';

export class User{
    emailId:string;
    customerName:string;
    password:string;
    security_question:string;
    security_answer:string;
    mobileNumber:string;
    role:string;
    address:Address[];
    carryBox:CarryBox;

}