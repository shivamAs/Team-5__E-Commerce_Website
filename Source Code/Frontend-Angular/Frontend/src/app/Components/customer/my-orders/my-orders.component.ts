import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[]
  constructor(private service: CustomerServiceService, private router: Router, private customer: CustomerComponent, private logger:LoggingService) { }

  ngOnInit() {
    
    // If the user is not logged in, navigating to Login Page
    if(localStorage.email==""){
      this.router.navigate(['authenticate'])
    }
    else{
    this.getMyOrders();
    this.customer.compressHeader()
    }
  }


  // Retrieving the list of orders from that user account from the backend
  getMyOrders() {
    this.logger.logStatus("Restrieving List of Orders !!");
    this.service.getMyOrders(localStorage.email).subscribe(data => {
      this.orders = data
      this.logger.logStatus("Retrieved the orders successfully !!");
    })
  }

  //To navigate to Home Page
  goToHome(){
    this.router.navigate(['customer'])
    this.logger.logStatus("Navigating to Home Page !!");
  }


  // Navigating to order details page with the selected order
  trackOrder(orderId: number) {
    this.router.navigate(['customer/trackOrder/' + orderId])
    this.logger.logStatus("Navigating to Track order Page !!");
  }
}
