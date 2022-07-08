import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  added: boolean = false
  addSubCategoryForm: FormGroup
  submitted: boolean = false
  categories: Category[]
  selectedCategory: number
  subCategory_name_already_exists: boolean = false

  //Injecting required services 
  constructor(private formBuilder: FormBuilder, private router: Router,private logger:LoggingService, private adminService: AdminServiceService) { }

  ngOnInit() {

    //if local storage is null, navigate to home page 
    if (localStorage.email == null) {
      this.router.navigate(['/customer'])
    }

    //setting validators for adding sub category
    this.addSubCategoryForm = this.formBuilder.group({
      subCategoryName: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]],
      category: ['', [Validators.required]]


    })
    this.getCategories();
  }

  //Function to get all the categories
  getCategories() {

    this.adminService.getCategories(localStorage.email).subscribe(
      data => { 
        this.logger.logStatus("Got all the catgeories successfully");
        this.categories = data }
    ),
      err => { console.log(err) }

  }

  //function to add a new sub category
  addSubCategory() {

    this.submitted = true
    //if form input is invalid, return
    if (this.addSubCategoryForm.invalid) {
      return;
    }
    else {
      //if form is valid, calling service to add a category
      this.adminService.addSubCategory(this.selectedCategory, this.addSubCategoryForm.value).subscribe(
        data => {
          this.logger.logStatus("Added the sub-catgeory successfully");
          this.added = true
          this.subCategory_name_already_exists = false
        },
         //error handling messages which are thrown by spring boot
        err => {

          if (err.error.errorMessage == "Sub-Category Name Already Exists") {
            this.logger.logStatus("Sub-Category Name Already Exists");
            this.subCategory_name_already_exists = true
            this.added = false
          }
        })

    }

  }

}
