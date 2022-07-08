import { User } from './User';
import { Order } from './Order';
import { Category } from './Category';
import { Item } from './Item';

export class Branch{
    branchId : number;
    branchName: string;
    admin:User;
    orders:Order[];
    items:Item[];
    category:Category[];
    contactNumber: number;

}