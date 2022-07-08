import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../../../Models/Address';
import { BranchDto } from '../../../Models/BranchDto';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  statusMsg:string=""
  user:User
  showAddressForm:boolean=false
  formUnderEdit:boolean=false
  addressFormSubmitted:boolean=false
  branches:BranchDto[]
  addressForm:FormGroup


  constructor(private router:Router, private service:CustomerServiceService,private logger:LoggingService,private formBuilder:FormBuilder) { }

  ngOnInit() {

    // If the user is not logged in, navigating to Login Page
    if(localStorage.email==""||!localStorage.email){
      this.router.navigate(['authenticate'])
    }
    else{
      this.getUserDetails()
      this.getAllBranches()
    }

      // Address form for adding or updating an address
      this.addressForm = this.formBuilder.group({
        addressId:[''],
        name: ['', [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3), Validators.maxLength(25)]],
        line1: ['', [Validators.required, Validators.maxLength(30)]],
        line2: ['', [Validators.required,Validators.maxLength(30)]],
        city: ['', [Validators.required]],
        landmark: ['', [Validators.required, Validators.maxLength(30)]],
        mobileNumber: ['', [Validators.required, Validators.pattern('[6-9][0-9]{9}')]]
      })
  
  }


  // To Retrieve all the details of an User from the backend
  getUserDetails(){
    this.service.getAnUserDetails(localStorage.email).subscribe(data=>{
      this.user=data
      this.logger.logStatus("User Details are retrieved successfully")
    },
    err=>{
      this.logger.logStatus("Error in retrieving user details")
    });
  }


  // To add a new address, form will be displayed
  addAddress(){
    this.showAddressForm=true
    this.formUnderEdit=false
  }


  // To edit an existing address, form will be displayed
  editAddress(address:Address){
    this.addressForm.setValue(address)
    this.showAddressForm=true
    this.formUnderEdit=true
  }


  // To close the address form when not required
  closeAddressForm(){
    this.showAddressForm=false
    this.addressForm.reset()
    this.formUnderEdit=false
    this.addressFormSubmitted=false
  }


  // To navigate to My Orders page
  goToMyOrders(){
    this.router.navigate(['customer/myOrders'])
    this.logger.logStatus("Navigating to My orders page")
  }

  //To navigate to Home Page
  goToHome(){
    this.router.navigate(['customer'])
    this.logger.logStatus("Navigating to Home Page")
  }


  // To delete an address when not required from the database
  deleteAddress(addressId:number){
    if(confirm("Are you sure want to delete the address?")){
    this.service.deleteAnAddress(addressId).subscribe(data=>{
      if(data){
        this.getUserDetails();
        this.statusMsg="Address is deleted successfully!!"
        this.logger.logStatus(addressId+" address is deleted")
        setTimeout(() => {
          this.statusMsg=""
        }, 3000);
      }
    },
    err=>{
      this.logger.logStatus("Error while deleting the address "+addressId)
    })
    }
  }


  // To add or update an address in the database
  saveAddress(){
    this.addressFormSubmitted=true
    if(this.addressForm.invalid){
      return;
    }
    else{
      if(this.formUnderEdit!=true){
        this.service.addANewAddress(localStorage.email,this.addressForm.value).subscribe(data=>{
          if(data)
            this.showAddressForm=false
            this.getUserDetails();
            this.addressForm.reset()
            this.addressFormSubmitted=false
            this.statusMsg="Address is added successfully!!"
            setTimeout(() => {
              this.statusMsg=""
            }, 3000);
        },
        err=>{
            this.logger.logStatus("Error while adding the address ")
        })
      }

      else{
          this.service.updateAnAddress(localStorage.email,this.addressForm.value).subscribe(data=>{
          if(data)
            this.showAddressForm=false
            this.getUserDetails();
            this.addressForm.reset()
            this.addressFormSubmitted=false
            this.statusMsg="Address is updated successfully!!"
            setTimeout(() => {
              this.statusMsg=""
            }, 3000);
        },
        err=>{
          this.logger.logStatus("Error while updating the address ")
        })
      }

    }
  }


  // To retrieve all the branches
  getAllBranches() {
    this.service.getAllBranches().subscribe(data => {
      this.branches = data
      this.logger.logStatus("Retrieved all the branches details ")
    },
    err=>{
      this.logger.logStatus("Error while Retrieving the branches ")
    })
  }
}
