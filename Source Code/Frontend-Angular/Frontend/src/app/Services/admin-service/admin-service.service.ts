import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubCategory } from '../../Models/subCategory';
import { Category } from '../../Models/Category';
import { Item } from '../../Models/Item';
import { Order } from '../../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  baseUrl: string = "http://localhost:8094/admin";
  constructor(private http:HttpClient) { }

  getSubCategories(username:string){
    return this.http.get<SubCategory[]> (this.baseUrl+"/getSubCategories/"+username);
  }
  getCategories(username:string){
    return this.http.get<Category[]> (this.baseUrl+"/getCategories/"+username);
  }

  getItems(username:string){
    return this.http.get<Item[]> (this.baseUrl+"/getItems/"+username)
  }

  addItem( username:string,  subCategoryId:number,item:Item){
      return this.http.post<Item>(this.baseUrl+"/addItem/"+username+"/"+subCategoryId, item);
  }

  addCategory(username:string, category: Category)
  {
    return this.http.post<Category>(this.baseUrl+"/addCategory/"+username, category)
  }

  addSubCategory(categoryId:number,subCategory:SubCategory)
  {
    return this.http.post<SubCategory>(this.baseUrl+"/addSubCategory/"+categoryId, subCategory)
  }
  deleteItem(itemId : number){
    return this.http.delete<boolean>(this.baseUrl+"/deleteItem/"+itemId);
  }
  getItem(itemId:number)
  {
    return this.http.get<Item>(this.baseUrl+"/getItem/"+itemId);
  }
  editItem( item:Item){
    return this.http.put<boolean>(this.baseUrl+"/editItem",item)
  }
  editCategory(username:string, category:Category){
      return this.http.put<boolean>(this.baseUrl+"/editCategory/"+username,category);
  }
  editSubCategory(subCategory:SubCategory){
    return this.http.put<boolean>(this.baseUrl+"/editSubCategory",subCategory);
}
  deleteCategory(categoryId: number){
    console.log(categoryId)
    return this.http.delete<boolean>(this.baseUrl+"/deleteCategory/"+categoryId);
  }
  deleteSubCategory(subCategoryId: number){
    return this.http.delete<boolean>(this.baseUrl+"/deleteSubCategory/"+subCategoryId);
  }

  getCategory(categoryId:number){
   return this.http.get<Category>(this.baseUrl+"/getCategory/"+categoryId);
  } 

  
  getSubCategory(subCategoryId:number){
    return this.http.get<SubCategory>(this.baseUrl+"/getSubCategory/"+subCategoryId);
  }
  getActiveOrderList(emailId:string){
   
    return this.http.get<Order[]>("http://localhost:8094/getActiveOrderList/"+emailId)
  }
  getOrderList(emailId:string){
    return this.http.get<Order[]>("http://localhost:8094/getOrderList/"+emailId)
  }

  updateActiveStatus(itemId:number, status:string){
    return this.http.get<boolean>(this.baseUrl+"/updateActiveStatus/"+itemId+"/"+status);
  }
  getSearchItems(adminId:string, searchText:string){
    return this.http.get<Item[]>(this.baseUrl+"/getSearchItems/"+adminId+"/"+searchText)
  }
  updateOrderStatus(orderId:number, orderStatus:string){
    return this.http.get<boolean>(this.baseUrl+"/updateOrderStatus/"+orderId+"/"+orderStatus)
  }
}
