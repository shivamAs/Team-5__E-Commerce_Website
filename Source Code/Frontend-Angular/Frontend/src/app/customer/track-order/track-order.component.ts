import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { CustomerComponent } from '../customer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orderId:number
  order:Order[]
  constructor(private service:CustomerServiceService, private customer:CustomerComponent, private route:ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => {
      this.orderId = params['orderId']  
    })
   }

  ngOnInit() {
    this.customer.compressHeader()
    
    this.trackTheOrder()
  }

  trackTheOrder(){
    this.service.trackAnOrder(this.orderId).subscribe(data=>{
      this.order=data
      console.log("recevied order details"+data[0].orderStatus);
      if(this.order[0].orderStatus=='Placed'){
        document.getElementById("step1").className="active"
      }
      else if(this.order[0].orderStatus=='Accepted'){
        document.getElementById("step1").className="active"
        document.getElementById("step2").className="active"
        document.getElementById("step3").className="semiActive"
      }
      else if(this.order[0].orderStatus=='Delivered'){
        document.getElementById("step1").className="active"
        document.getElementById("step2").className="active"
        document.getElementById("step3").className="active"
        document.getElementById("step4").className="active"
      }
    },
    err=>{
      console.log("error in retrieving order details");
      
    })
  }

  myOrders(){
    this.router.navigate(['customer/myOrders'])
  }
}
