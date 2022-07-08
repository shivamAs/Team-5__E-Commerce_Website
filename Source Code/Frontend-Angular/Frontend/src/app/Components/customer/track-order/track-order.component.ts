import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { CustomerComponent } from '../customer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orderId: number
  order: Order[]
  rejectionMsg: string
  orderRejected: boolean = false
  constructor(private service: CustomerServiceService, private customer: CustomerComponent, private route: ActivatedRoute, private router: Router, private logger: LoggingService) {

    // Retrieving the data in the routing url params
    this.route.params.subscribe(params => {
      this.orderId = params['orderId']
    })
  }

  ngOnInit() {

    // If the user is not loggedin, navigating to Login page
    if (localStorage.email == "") {
      this.router.navigate(['authenticate'])
    }
    else {
      this.customer.compressHeader()
      this.trackTheOrder()
    }
  }


  // Retrieving the order details from backend
  trackTheOrder() {
    this.logger.logStatus("Retrieving Order Details!!");
    this.service.trackAnOrder(this.orderId).subscribe(data => {
      this.order = data
      this.logger.logStatus("Retrieved Order Details Successfully!!");

      //If the order is rejected, status description and separate way of page design will be shown
      if (this.order[0].orderStatus == 'Rejected') {
        this.orderRejected = true
        if (this.order[0].statusDescription != "") {
          this.rejectionMsg = this.order[0].statusDescription
        }
        else
          this.rejectionMsg = "Due to some issues!! Sorry for the Inconvenience!!"
      }


      //Setting the Step Progress bar with different types of order status
      if (this.order[0].orderStatus == 'Placed') {
        document.getElementById("step1").className = "active"
      }
      else if (this.order[0].orderStatus == 'Accepted') {
        document.getElementById("step1").className = "active"
        document.getElementById("step2").className = "active"
        document.getElementById("step3").className = "semiActive"
      }
      else if (this.order[0].orderStatus == 'Delivered') {
        document.getElementById("step1").className = "active"
        document.getElementById("step2").className = "active"
        document.getElementById("step3").className = "active"
        document.getElementById("step4").className = "active"
      }
    },
      err => {
        this.logger.logStatus("Error in retrieving the order details from backend!!");
      })
  }


  //To navigate to my orders page automatically after successful order
  myOrders() {
    this.router.navigate(['customer/myOrders'])
  }
}
