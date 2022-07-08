import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup
  submitted: boolean = false
  added: boolean = false
  category_name_already_exists: boolean = false

  //Injecting required services 
  constructor(private formBuilder: FormBuilder,private logger:LoggingService, private router: Router, private adminService: AdminServiceService) { }

  ngOnInit() {

    //if local storage is null, navigate to home page 
    if (localStorage.email == null) {
      this.router.navigate(['/customer'])
    }


    //setting validators for adding category
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]]

    })
    this.getSubCategories();
  }


  //Function to get all the subcategories
  getSubCategories() {
    //calling service to get all the subcategories
    this.adminService.getSubCategories(localStorage.email).subscribe(
      data=>{
        this.logger.logStatus("Got all the subcategories");
      }
    ),
      err => { console.log(err) }

  }

  //function to add a new category
  addCategory() {
    this.submitted = true

    //if form input is invalid, return
    if (this.addCategoryForm.invalid) {
      return;
    }
    else {
      //if form is valid, calling service to add a category
      this.adminService.addCategory(localStorage.email, this.addCategoryForm.value).subscribe(
        data => {
          this.logger.logStatus("Added a category");
          this.added = true
        },
        //error handling messages which are thrown by spring boot
        err => {

          if (err.error.errorMessage == "Category Name Already Exists") {
            this.category_name_already_exists = true
          }
        })

    }

  }


}
