import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '../../../Models/subCategory';
import { Item } from '../../../Models/Item';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { LoggingService } from '../../../Models/LoggingService';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup
  editItemForm: FormGroup
  submitted: boolean = false
  subCategories: SubCategory[]
  selectedSubCatgeory: any
  itemId: number;
  
  select: boolean = true
  item_details: Item
  addedItem: boolean = false;
  editedItem: boolean = false
  item_name_already_exists: boolean = false;

  //injecting required services
  constructor(private formBuilder: FormBuilder,private logger:LoggingService, private adminService: AdminServiceService, private route: ActivatedRoute, private router: Router) {

    //getting item id for editing an item from other component using activated router 
    this.route.params.subscribe(params => {
      this.itemId = params['itemId'];
      if (this.itemId != null) {
        this.select = false
      }
    })
  }

  ngOnInit() {

    //if local storage is null, navigate to home page 
    if (localStorage.email == null) {
      this.router.navigate(['/customer'])
    }

    console.log(this.select)

    //setting validations for adding a new Item form
    this.addItemForm = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]],
      itemDescription: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]],
      itemPrice: ['', [Validators.required, Validators.min(10), Validators.max(1000)]],
      speciality: ['', [Validators.required]],
      type: ['', [Validators.required]],
      subCategory: ['', Validators.required]


    })

    this.getSubCategories();

    if (this.select == false) {

      //setting validations for editing a new item form
      this.editItemForm = this.formBuilder.group({
        itemId: [''],
        itemName: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]],
        itemDescription: ['', [Validators.required, Validators.pattern("[A-Za-z].*")]],
        itemPrice: ['', [Validators.required, Validators.min(10), Validators.max(1000)]],
        speciality: ['', [Validators.required]],
        type: ['', [Validators.required]]

      })

      this.getItem(this.itemId)
    }
  }

  //function to get all the subcategories
  getSubCategories() {

    //calling service to get all the subcategories
    this.adminService.getSubCategories(localStorage.email).subscribe(data => {
      this.logger.logStatus("Got all the subcategories");
      this.subCategories = data}),
      err => { console.log(err) }

  }

  //function to get the item details by item id
  getItem(itemId: number) {

    //calling service to get the item details by item id
    this.adminService.getItem(itemId).subscribe(data => {
      this.logger.logStatus("Got item by item Id");
      this.item_details = data
      
      this.logger.logStatus("Obtained itemId is set to form");
      //setting the values of item to editform
      this.editItemForm.patchValue(data)
     

    })
  }

  //function to add a new item
  addItem() {
    this.item_name_already_exists=false
    this.submitted = true

    //return if the form is invalid
    if (this.addItemForm.invalid) {
      return;
    }

    else {
      this.item_name_already_exists=false

      
      //calling service to add a new item
      this.adminService.addItem(localStorage.email, this.selectedSubCatgeory, this.addItemForm.value).subscribe(
        data => {
          this.logger.logStatus("Added item successfully");
          this.addedItem = true
        }, err => {
          if(err.error.errorMessage=="Item name already exists exception")
          {
              this.item_name_already_exists=true
          }
        } )
    }

  }


  //function to edit a item
  editItem() {


    this.submitted = true

    if(this.editItemForm.invalid)
     return
    //calling service to edit a item
    this.adminService.editItem(this.editItemForm.value).subscribe(data => {
      if (data) {
        this.logger.logStatus("Edited item successfully");
        this.editedItem = true;
        this.router.navigate(['/admin/items']);

      }
    }, err => {

    }
    )
  }



}
