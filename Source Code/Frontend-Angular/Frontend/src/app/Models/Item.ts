import { Branch } from './Branch';
import { CarryBox } from './CarryBox';
import { Order } from './Order';
import { SubCategory } from './subCategory';

export class Item{
    itemId:number;
    itemName:string;
    itemDescription:string;
    itemPrice:number;
    speciality:string;
    active:boolean;
    type:string;
    quantity:number;
    picture:string;
    picByte:number;
    pic_type: string;
    branch:Branch;
    carryBox:CarryBox;
    orders: Order[];
    subCategory: SubCategory[];

}