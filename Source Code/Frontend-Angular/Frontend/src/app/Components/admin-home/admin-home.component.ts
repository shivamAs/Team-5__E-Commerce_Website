import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

//navigate to dashboard
home(){
  this.router.navigate(['/admin/dashboard']);
}

//navigate to orders
getOrders()
{
  this.router.navigate(['/admin/orders']);
}

//navigate to add item page
addItem(){
  this.router.navigate(['/admin/addItem']);
}

//navigate to add catgeory page
addCategory(){
  this.router.navigate(['/admin/addCategory']);
}

//navigate to add sub-catgeory page
addSubCategory(){
  this.router.navigate(['/admin/addSubCategory']);
}

//navigate to categories
getCategories(){
  this.router.navigate(['/admin/categories']);
}

//navigate to sub-categories
getSubCategories(){
  this.router.navigate(['/admin/subCategories']);
}

//navigate to get-items
getItems()
{
  this.router.navigate(['/admin/items']);
}

//navigate to roles
roles()
{
  this.router.navigate(['/admin/r&p']);

}

//logout
logout(){
  localStorage.email=""
  this.router.navigate([''])
}
}



