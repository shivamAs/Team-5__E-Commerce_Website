import { Component, OnInit } from '@angular/core';
import { CarryBox } from '../../../Models/CarryBox';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';
import { FilterCarryBoxItemsPipe } from '../../../Pipes/CustomerPipes/filter-carryBoxItems/filter-carry-box-items.pipe';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-carry-box',
  templateUrl: './carry-box.component.html',
  styleUrls: ['./carry-box.component.css']
})
export class CarryBoxComponent implements OnInit {

  carryBox: CarryBox
  temp: any
  filterCarryBoxItems = new FilterCarryBoxItemsPipe
  constructor(private service: CustomerServiceService, private router: Router, private customer: CustomerComponent, private logger:LoggingService) { }

  ngOnInit() {
    if(localStorage.email==""){
      this.router.navigate(['authenticate'])
    }
    else{
    this.getCarryBoxDetails();
    this.customer.compressHeader()
  }
  }


  //Retrieving the carry box details from the backend
  getCarryBoxDetails() {
    this.service.getCarryBoxDetails(localStorage.email).subscribe(data => {
      this.carryBox = data
      this.logger.logStatus("Retrieved Carry Box Details Successfully !!");
    },
      err => {
        this.logger.logStatus("Error in Retrieving Carry Box Details !!");
      })
  }


  // To decrease the quantity of an item in the carry box
  decreaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);

    // If the quantity is 1, then removing that item from the carrybox
    if (this.temp > 1) {
      this.service.updateItemInCarryBox(localStorage.email, itemId, this.temp - 1).subscribe(data => {
        if (data) {
          this.logger.logStatus("Item "+itemId+" is updated Successfully !!");
          this.getCarryBoxDetails()
        }
      },
        err => {
          this.logger.logStatus("Error in updating Item "+itemId+" !!");
        })
    }


    // If the quantity is 1, then removing that item from the carrybox
    else {
      this.removeCarryBoxItem(itemId);
    }
  }


  // To increase the quantity of an item in the carry box
  increaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);
    this.service.updateItemInCarryBox(localStorage.email, itemId, this.temp + 1).subscribe(data => {
      if (data) {
        this.logger.logStatus("Item "+itemId+" is updated Successfully !!");
        this.getCarryBoxDetails()
      }
    },
      err => {
        this.logger.logStatus("Error in updating Item "+itemId+" !!");
      })
  }


  // To remove an item from the carrybox when not needed
  removeCarryBoxItem(itemId: number) {
    this.service.deleteACarryBoxItem(localStorage.email, itemId).subscribe(data => {
      if (data) {
        this.getCarryBoxDetails();
        this.logger.logStatus("Item "+itemId+" is removed Successfully !!");
      }
    })
  }


  // To clear the entire carrybox
  clearTheCarryBox() {
    if (confirm("Are you sure want to delete all the items in the Carry Box?")) {
      this.service.clearTheCarryBox(localStorage.email).subscribe(data => {
        if (data) {
          this.getCarryBoxDetails();
          this.logger.logStatus("Carry Box is cleared Successfully !!");
        }
      })
    }
    else
      return
  }


  // To navigate to place-order page when buying option is chosen by the user 
  placeOrder() {
    this.router.navigate(["customer/placeOrder"])
    this.logger.logStatus("Navigating to Place Order Page !!");
  }


  // To navigate to items page to add new items 
  goToItems(){
    this.router.navigate(['customer/items/category/Starters'])
    this.logger.logStatus("Navigating to Items Page !!");
  }


  // To navigate to Home page  
  goToHome(){
    this.router.navigate(['customer'])
    this.logger.logStatus("Navigating to Home Page !!");
  }

}
