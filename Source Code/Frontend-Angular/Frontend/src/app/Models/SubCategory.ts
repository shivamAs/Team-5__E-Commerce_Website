import { Item } from './Item';
import { Category } from './Category';

export class SubCategory{
    subCategoryId:number;
    subCategoryName:string;
    items:Item[];
    category:Category;
}