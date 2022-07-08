import { Branch } from './Branch';
import { SubCategory } from './subCategory';

export class Category{
    categoryId : number;
    categoryName:string;
    subCategories:SubCategory[];
    branch: Branch;
}