import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { Router } from '@angular/router';
import { LoggingService } from '../../../Models/LoggingService';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  placedOrder:Order[];
  activeOrder:Order[];
  count:number;
  count1:number;
  emailId:string;
  updating:boolean=false
  constructor(private adminService:AdminServiceService, private router:Router,private logger:LoggingService) { }

  ngOnInit() {
    //if local storage is null, navigate to home page 
    if (localStorage.email == null) {
      this.router.navigate(['/customer'])
    }
    this.getOrderList(this.emailId);
    this.getActiveOrderList(this.emailId);


  }
    getOrderList(emailId: string){
      this.adminService.getOrderList(localStorage.email).subscribe(data=>{
        this.placedOrder=data;
        this.count=this.placedOrder.length;
      },err=>{
        console.log(err);
      });
    }
    getActiveOrderList(emailId:string){

      this.adminService.getActiveOrderList(localStorage.email).subscribe(data=>{
        this.activeOrder=data;
        this.count1=this.activeOrder.length;
      },err=>{
        console.log(err);
      });
    }



  //function to update status of the order
  updateStatus(orderId:number, status:string){

    //calling service to update order status
    this.adminService.updateOrderStatus(orderId, status).subscribe(data=>
      {
        this.updating=true
        this.logger.logStatus("updated the order status ");
        //timeout for loader
        setTimeout(() => {
          this.updating=false
        }, 2500);

        console.log("data")
        this.getActiveOrderList(localStorage.email);
        this.getOrderList(localStorage.email);

      })
  }
 


}
