import { User } from './User';
import { Order } from './Order';

export class Address{
    addressId : number;
    name: string;
    line1:string;
    line2:string;
    city:string;
    landmark:string;
    mobileNumber: User;
    orders : Order[];

}