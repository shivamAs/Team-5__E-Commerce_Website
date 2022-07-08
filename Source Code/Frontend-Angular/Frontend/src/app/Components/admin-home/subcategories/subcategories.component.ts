import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory } from '../../../Models/subCategory';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  subCategories:SubCategory[]
  categories:SubCategory[]
  child_records_found:boolean=false;
  sub_category_details:SubCategory
  editSubCategoryForm:FormGroup
  edit:boolean=false
  searchText:string
  added:boolean=false
  submitted:boolean=false
  subCategory_name_already_exists:boolean=false

  
    //Injecting required services
    constructor(private adminService:AdminServiceService, private router: Router,private logger:LoggingService, private formBuilder: FormBuilder) { }
  
    ngOnInit() {
      //if local storage is null, navigate to home page 
      if (localStorage.email == null) {
        this.router.navigate(['/customer'])
      }

      //setting validators for editing sub category
      this.editSubCategoryForm=this.formBuilder.group({
        subCategoryId:[''],
        subCategoryName:['',[Validators.required,Validators.pattern("[A-Za-z].*")]],
        category:['',[Validators.required]]
  
   
      })
      this.getSubCategories();
      
    }
  
    //Function to get all the sub-categories
    getSubCategories()
    {
      this.child_records_found=false;
      //calling service to get all the sub-categories
      this.adminService.getSubCategories(localStorage.email).subscribe(data=>{
        this.logger.logStatus("Got all the subcategories");
        this.subCategories = data;
        console.log(this.subCategories)

      })
    }

    //function to delete a sub-category
    deleteSubCategory(subCategoryId : number)
    {
      this.child_records_found=false;
      //calling service to delete a sub-category
      this.adminService.deleteSubCategory(subCategoryId).subscribe(data=>{
        if(data){
          this.logger.logStatus("deleted the subcatgeory");
          this.getSubCategories();
        }
      },
      //error handling messages which are thrown by spring boot
      err=>{
        if(err.error.errorMessage=="child records found") {
          this.logger.logStatus("child records found");
            this.child_records_found=true;
      }
      
    })
    
    }

    //function to allow to edit a sub-category
    updateSubCategory(subCategoryId : number){
      this.edit=true;
      this.child_records_found=false;
     this.adminService.getSubCategory(subCategoryId).subscribe(data=>{
       this.sub_category_details = data;
       this.logger.logStatus("Got the subcategory details and set to the form");
         //setting this details to edit form
       this.editSubCategoryForm.patchValue(data)

     })
    }

      //function to save the edited sub-category
    editSubCategory(){
      this.child_records_found=false;
        this.edit=false;
     
        this.adminService.editSubCategory(this.editSubCategoryForm.value).subscribe(data=>{console.log("edited")
      if(data){
        this.logger.logStatus("Edited the form");
        this.getSubCategories();
      }
      },err=>{

    
       })
    
  }
}
