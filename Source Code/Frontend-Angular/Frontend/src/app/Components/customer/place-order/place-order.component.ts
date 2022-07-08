import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from '../customer.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CarryBox } from '../../../Models/CarryBox';
import { Address } from '../../../Models/address';
import { BranchDto } from '../../../Models/branchDto';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  constructor(private customer: CustomerComponent, private service: CustomerServiceService, private router: Router, private logger: LoggingService, private formBuilder: FormBuilder) { }
  orderPlaced: boolean = false
  orderSuccess: boolean = true
  addresses: Address[]
  statusMsg: string = ""
  carryBox: CarryBox
  selectedAddressId: number = 0
  selectedPaymentType: string = ""
  addNewAddress: boolean = false
  cityNotSelected: boolean = false
  addressFormSubmitted: boolean = false
  branches: BranchDto[]
  deliverable: boolean = true
  currentBranch: string
  addAddressForm: FormGroup

  ngOnInit() {

    // If the user is not loggedin, navigating to Login Page
    if (localStorage.email == "") {
      this.router.navigate(['authenticate'])
    }
    else {
      this.customer.removeHeader()
      this.getCarryBoxDetails()
      this.getMyAddresses();
      this.getAllBranches();
    }

  // Address form for adding a new address
    this.addAddressForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3), Validators.maxLength(25)]],
      line1: ['', [Validators.required, Validators.maxLength(30)]],
      line2: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required]],
      landmark: ['', [Validators.required, Validators.maxLength(30)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9][0-9]{9}')]]
    })


  }


  // retrieving the carrybox details from the backend
  getCarryBoxDetails() {
    this.logger.logStatus("Retrieving Carry Box Details!!");
    this.service.getCarryBoxDetails(localStorage.email).subscribe(data => {
      this.carryBox = data
      this.logger.logStatus("Retrieved Carry Box Details Successfully!!");
    },
      err => {
        this.logger.logStatus("Error in retrieving Carry Box Details!!");
      })
  }


  // Retrieving all the saved address in that user account
  getMyAddresses() {
    this.logger.logStatus("Retrieving Saved Addresses !!");
    this.service.getMyAddresses(localStorage.email).subscribe(data => {
      this.addresses = data.reverse()
      this.logger.logStatus("Retrieved Saved Addresses successfully !!");
    },
      err => {
        this.logger.logStatus("Error in Retrieving Saved Addresses !!");
      })
  }


  // Selecting the address to which the order to be placed
  setAddressId(addressId: number) {
    for (let i = 0; i < this.addresses.length; i++) {
      document.getElementById(this.addresses[i].addressId.toString()).className = "addressCard";
    }
    if (this.selectedAddressId != addressId) {
      this.selectedAddressId = addressId
      this.addNewAddress = false
      document.getElementById(this.selectedAddressId.toString()).className = "selectedAddressCard";
      this.logger.logStatus("Delivery Address is Selected!!");
      this.checkDeliverable()
    }
    else {
      this.deliverable = true
      this.selectedAddressId = 0
      this.logger.logStatus("Delivery Address is Unselected!!");
    }
  }


  // To check whether the selected address is in the branch's region or not
  checkDeliverable() {
    for (let i = 0; i < this.branches.length; i++) {
      if (this.branches[i].branchId == localStorage.location) {
        this.currentBranch = this.branches[i].branchCity
      }
    }
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].addressId == this.selectedAddressId) {
        if (this.addresses[i].city == this.currentBranch) {
          this.deliverable = true
        }
        else {
          this.deliverable = false
        }
        break;
      }
    }
  }


  // To show the address form when a new adddress is to be added
  openAddressForm() {
    this.addNewAddress = true
    this.setAddressId(this.selectedAddressId)
    this.logger.logStatus("Add Address Form is opened!!");
  }


  // To close the address form when not needed
  closeAddressForm() {
    this.addNewAddress = false
    this.addressFormSubmitted = false
    this.addAddressForm.reset();
    this.cityNotSelected = false
  }


  // Posting a new address to that user account database
  addAddress() {
    this.addressFormSubmitted = true
    if (this.addAddressForm.controls.city.value == "") {
      this.cityNotSelected = true;
    }
    if (this.addAddressForm.invalid)
      return
    else {
      this.logger.logStatus("Adding a New Address !!");
      this.service.addANewAddress(localStorage.email, this.addAddressForm.value).subscribe(data => {
        if (data) {
          this.getMyAddresses();
          this.addNewAddress = false
          this.addAddressForm.reset()
          this.logger.logStatus("New Address is added successfully!!");

          // Displaying the status message
          this.statusMsg = "Address added Successfully!!"
          setTimeout(() => {
            this.statusMsg = ""
          }, 2500);
        }
      },
        err => {
          this.logger.logStatus("Error in adding new Address !!");
        })
    }
  }


  // Selecting the payment type
  setPaymentType(type: string) {
    document.getElementById("upi").className = "left"
    document.getElementById("card").className = "left"
    document.getElementById("net").className = "left"
    document.getElementById("cod").className = "left"

    document.getElementById(type).className = "selectedType"
    this.selectedPaymentType = type
    this.logger.logStatus("Payment Type is Selected!!");
  }


  // Navigating to carrybox to review the order
  goToCarryBox() {
    this.router.navigate(['customer/myCarryBox'])
    this.logger.logStatus("Navigating to Carry Box Page !!");
  }


  // Navigating to items page, when order is cancelled
  goToItems() {
    this.router.navigate(['customer/items/category/Biryanis'])
    this.logger.logStatus("Navigating to Items Page !!");
  }


  // Placing order
  placeOrder() {
    if (this.selectedAddressId != 0) {
      this.orderSuccess = false
      this.logger.logStatus("Placing a new order !!");
      this.service.placeOrder(localStorage.email, localStorage.location, this.selectedAddressId).subscribe(data => {
        console.log("order Placed");
        this.orderSuccess = true
        this.orderPlaced = true
        this.logger.logStatus("Order is succesfully placed !!");
        setTimeout(() => {
          this.router.navigate(['customer/trackOrder/' + data])
        }, 6000);
      },
        err => {
          setTimeout(() => {
            this.orderSuccess = false
            this.orderPlaced = true
          }, 0);
          this.logger.logStatus("Error in placing the order.. !!");
          this.logger.logStatus("Error Message :" + err.error.errorMessage);

          // To display the error message
          this.statusMsg = err.error.errorMessage
        })
    }
  }


  // Resetting the entire page when ordering again
  resetAgain() {
    this.orderPlaced = false
    this.orderSuccess = true
    this.selectedAddressId = 0
    this.statusMsg = ""
  }


  // To retrieve all the branches
  getAllBranches() {
    this.service.getAllBranches().subscribe(data => {
      this.branches = data
      this.logger.logStatus("Retrieved all the branches details");
    },
      err => {
        this.logger.logStatus("Error while retrieving the branches");
      })
  }

}
