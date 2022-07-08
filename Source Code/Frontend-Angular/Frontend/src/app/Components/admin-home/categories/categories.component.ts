import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { Category } from '../../../Models/Category';
import { Router } from '@angular/router';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[]
  child_records_found: boolean = false;
  editable: boolean = false
  editCategoryForm: FormGroup
  category_details: Category
  searchText: string
  submitted: boolean = false
  category_name_already_exists: boolean = false
  added: boolean = false


  //Injecting required services 
  constructor(private adminService: AdminServiceService,private logger:LoggingService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    //if local storage is null, navigate to home page 
    if (localStorage.email == null) {
      this.router.navigate(['/customer'])
    }
    //setting validators for editing category
    this.editCategoryForm = this.formBuilder.group({
      categoryId: [''],
      categoryName: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]]

    })
    this.getCategories();
  }

  //Function to get all the categories
  getCategories() {

    this.child_records_found = false;
    this.editable = false
    //calling service to get all the categories
    this.adminService.getCategories(localStorage.email).subscribe(data => {
      this.categories = data;
      this.logger.logStatus("Got all the catgeories successfully");
    })
  }

  //function to delete a category
  deleteCategory(categoryId: number) {

    this.category_name_already_exists = false
    this.child_records_found = false;
    this.editable = false
    console.log(categoryId)

    //calling service to delete a category
    this.adminService.deleteCategory(categoryId).subscribe(data => {
    if (data) {
      this.logger.logStatus("Deleted the catgeory successfully");
      this.getCategories();
    }
    },
       //error handling messages which are thrown by spring boot
    err => {
      if (err.error.errorMessage == "child records found") {
        this.logger.logStatus("child records found");
        this.child_records_found = true;
      }
    } )

  }

  //function to allow to edit a category
  editCategory(categoryId: number) {

    this.category_name_already_exists = false
    this.editable = true;
    this.child_records_found = false;
    this.adminService.getCategory(categoryId).subscribe(data => {
    this.category_details = data
    console.log(data)
    this.logger.logStatus("Got the category details by category Id and set to form ");
    //setting this details to edit form

    this.editCategoryForm.patchValue(data);
    })

  }

  //function to save the edited category
  updateCategory() {

    this.category_name_already_exists = false
    this.editable = false;
    this.submitted = true
    //if form is invalid, return
    if (this.editCategoryForm.invalid) {
      return;
    }
    else {
      //calling service to edit a category
      this.adminService.editCategory(localStorage.email, this.editCategoryForm.value).subscribe(
        data => {
          this.logger.logStatus("Edited the category");

          if (data) {
            this.getCategories();
          }
        }, err => {


        }
      )
    }
  }
}
