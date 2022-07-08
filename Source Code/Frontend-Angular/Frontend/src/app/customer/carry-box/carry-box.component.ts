import { Component, OnInit } from '@angular/core';
import { CarryBox } from '../../../Models/CarryBox';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';
import { FilterCarryBoxItemsPipe } from '../../../Pipes/CustomerPipes/filter-carryBoxItems/filter-carry-box-items.pipe';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';

@Component({
  selector: 'app-carry-box',
  templateUrl: './carry-box.component.html',
  styleUrls: ['./carry-box.component.css']
})
export class CarryBoxComponent implements OnInit {

  carryBox:CarryBox
  temp:any
  filterCarryBoxItems=new FilterCarryBoxItemsPipe
  constructor(private service:CustomerServiceService, private router:Router, private customer:CustomerComponent) { }

  ngOnInit() {
    this.getCarryBoxDetails();
    this.customer.compressHeader()
  }

  getCarryBoxDetails() {
    this.service.getCarryBoxDetails("sriharsha.p158@gmail.com").subscribe(data => {
      this.carryBox = data
      console.log("received Carry box details");
    },
      err => {
        console.log("error in retrieving carrybox details");
      })
  }

  decreaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);
    if (this.temp > 1) {
      this.service.updateItemInCarryBox("sriharsha.p158@gmail.com", itemId, this.temp - 1).subscribe(data => {
        if (data) {
          console.log("item updated");
          this.getCarryBoxDetails()
        }
      },
        err => {
          console.log(("error in updating item"));
        })
    }
    else {
      this.removeCarryBoxItem(itemId);
    }
  }

  increaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);
    this.service.updateItemInCarryBox("sriharsha.p158@gmail.com", itemId, this.temp + 1).subscribe(data => {
      if (data) {
        console.log("item updated");
        this.getCarryBoxDetails()
      }
    },
      err => {
        console.log(("error in updating item"));
      })
  }


  removeCarryBoxItem(itemId: number) {
    this.service.deleteACarryBoxItem("sriharsha.p158@gmail.com", itemId).subscribe(data => {
      if (data) {
        this.getCarryBoxDetails();
      }
    })
  }

  clearTheCarryBox() {
    if (confirm("Are you sure want to delete all the items in the Carry Box?")) {
      this.service.clearTheCarryBox("sriharsha.p158@gmail.com").subscribe(data => {
        if (data) {
          this.getCarryBoxDetails();
        }
      })
    }
    else
      return
  }

  placeOrder(){
    this.router.navigate(["customer/placeOrder"])
  }

  
}
