import { Item } from './Item';
import { User } from './User';

export class CarryBox{
    boxId:number;
    totalCost:number;
    itemlist: Item[];
    customer: User;
}