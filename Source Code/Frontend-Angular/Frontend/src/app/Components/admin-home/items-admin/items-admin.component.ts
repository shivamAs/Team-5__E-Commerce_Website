import { Component, OnInit } from '@angular/core';
import { Item } from '../../../Models/Item';
import { MergeArrayPipe } from '../../../Pipes/AdminPipes/merge-array.pipe';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../Services/admin-service/admin-service.service';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-items-admin',
  templateUrl: './items-admin.component.html',
  styleUrls: ['./items-admin.component.css']
})
export class ItemsAdminComponent implements OnInit {
  searchtext:string=""
  items:Item[]
  value:string
  status:boolean
  child_records_found:boolean =false;
  searchText:string

  
    //Injecting required services 
    constructor(private adminService: AdminServiceService,private logger:LoggingService, private router:Router) { }
  
    ngOnInit() {

      //if local storage is null, navigate to home page 
      if (localStorage.email == null) {
        this.router.navigate(['/customer'])
      }
      this.getItems();
    
   
    }

    
  //Function to get all the items
    getItems()
    {
      this.adminService.getItems(localStorage.email).subscribe(
        data=>{
          this.logger.logStatus("Got all the items successfully");
          this.items=data
                }
  
      )
    }

  //passing item id using router params(Activated router) to edit a item
  edit(itemId:number){
    this.logger.logStatus("navigated to edit item");
    this.router.navigate(['/admin/addItem',itemId])
  }
  
  //delete a item
  delete(itemId : number){
  
    //calling a service to delete the item
    this.adminService.deleteItem(itemId).subscribe(data=>{
      this.getItems();
      this.logger.logStatus("Delete the item by item Id");
    },
    
    //error handling messages which are thrown by spring boot
    err=>{
      if(err.error.errorMessage=="child records found") {
        this.child_records_found=true;}
      
    })
    
  }

  //function to update active status of a item
  updateActiveStatus(itemId:number){
  

  var values = (<HTMLInputElement>document.getElementById(itemId.toString()+"-active")).value
  //calling service  to update active status
   this.adminService.updateActiveStatus(itemId,values).subscribe(data=>{
    this.logger.logStatus("updated the active status of the item");
     this.getItems();
    })
  }
}

