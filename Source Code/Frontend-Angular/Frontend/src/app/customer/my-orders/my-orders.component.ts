import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders:Order[]
  constructor(private service:CustomerServiceService, private router:Router,private customer:CustomerComponent) { }

  ngOnInit() {
    this.getMyOrders();
    this.customer.compressHeader()
  }

  getMyOrders(){
    this.service.getMyOrders("sriharsha.p158@gmail.com").subscribe(data=>{
      this.orders=data
      console.log("received orders details");
    })
  }

  trackOrder(orderId:number){
    this.router.navigate(['customer/trackOrder/'+orderId])
  }
}
