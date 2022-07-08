import { Time } from '@angular/common';
import { Address } from './Address';
import { Branch } from './Branch';
import { Item } from './Item';
import { User } from './User';

export class Order
{
    id:number;
    orderId: number;
    quantity:number;
    orderDate:Date;
    orderTime:Time;
    orderPrice:number;
    orderStatus:string;
    statusDescription:string;
    address:Address;
    branch_order:Branch;
    customer:User;
    item:Item;
    
}