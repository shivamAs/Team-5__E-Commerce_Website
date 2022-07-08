import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '../../../Models/subCategory';
import { CarryBox } from '../../../Models/CarryBox';
import { CustomerComponent } from '../customer.component';
import { FilterCarryBoxItemsPipe } from '../../../Pipes/CustomerPipes/filter-carryBoxItems/filter-carry-box-items.pipe';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';
import { LoggingService } from '../../../Models/LoggingService';
import { Item } from '../../../Models/Item';
import { FilterItemsPipe } from '../../../Pipes/CustomerPipes/filter-items/filter-items.pipe';
import { FilterParameterPipe } from '../../../Pipes/CustomerPipes/filter-parameter/filter-parameter.pipe';
import { IfStmt } from '@angular/compiler';
import { SortItemsPipe } from '../../../Pipes/CustomerPipes/sort-items/sort-items.pipe';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  branch:string
  temp: any
  showContent: boolean = false
  heading: string = ''
  type: string
  items: any
  filter: string = ""
  filter2:string = ""
  sortBy:string = ""
  categories: SubCategory[]
  carryBox: CarryBox
  filteredItems:Item[]
  filterCarryBoxItems = new FilterCarryBoxItemsPipe()
  filterItems = new FilterItemsPipe()
  filterByParameter = new FilterParameterPipe()
  sortItems = new SortItemsPipe()

  constructor(private service: CustomerServiceService, private route: ActivatedRoute, private router: Router, private customer: CustomerComponent, private logger:LoggingService) {
  }

  ngOnInit() {

    // Retrieving the data in the routing URL params
    this.route.params.subscribe(params => {
      this.type = params['type']
      this.filter = params['filter']
      setTimeout(() => {

        // Adjusting the design when a category items are to be shown
        if (this.type == 'category') {
          this.heading = this.filter
          document.getElementById("select").style.color = "#29150e"
        }
        // Adjusting the design when search results are to be shown
        else {
          this.searchItems();
          this.heading = "Search Results"
          document.getElementById("select").style.color = "grey"
        }
        this.filter2=""
        this.sortBy=""
        this.getABranchCategories()
        
      }, 500);

    })
    this.customer.compressHeader();
    if(localStorage.email!=""){
      this.getCarryBoxDetails()
    }
  }


  // Retrieving the search results from the backend
  searchItems() {
    this.logger.logStatus("Searching for the items.. !!");
    this.service.searchItems(localStorage.location, this.filter).subscribe(data => {
      this.items = data
      this.logger.logStatus("Retrieved Search Results Successfully !!");
    },
      err => {
        this.logger.logStatus("Error in Retrieving Search Results !!");
      })
  }


  // Retrieving all the existing categories from the backend
  getABranchCategories() {
    this.service.getABranchCategories(localStorage.location).subscribe(data => {
      this.categories = data
      this.filteredItems=this.filterItems.transform(this.categories,this.filter)
      this.logger.logStatus("Retrieved Categories Successfully !!");
    },
      err => {
        this.logger.logStatus("Error in Retrieving categories !!");

      })
  }


  // Retrieving the carry box details from the backend
  getCarryBoxDetails() {
    this.service.getCarryBoxDetails(localStorage.email).subscribe(data => {
      this.carryBox = data
      this.logger.logStatus("Retrieved Carry Box Details Successfully !!");
      this.showContent = true
    },
      err => {
        this.logger.logStatus("Error in Retrieving Carry Box Details !!");
      })
  }


  // To filter the items according to a particular category
  setFilter() {
    this.heading = ""
    this.customer.searchText = ""
    this.router.navigate(["customer/items/category/" + this.filter])
    this.logger.logStatus("navigating to "+this.filter+" items page !!");
  }


  // To filter the items according to a particular parameter
  setFilter2(){
    this.filteredItems=this.filterItems.transform(this.categories,this.filter);
    if(this.filter2!=""){
      this.filteredItems=this.filterByParameter.transform(this.filteredItems,this.filter2)
    }
    this.logger.logStatus(this.filter2 + " filter applied !!");
  }

  setSortBy(){
      this.filteredItems=this.sortItems.transform(this.filteredItems,this.sortBy);
  }

  // To add a new item to the carry box
  addToCarryBox(itemId: number) {
    this.service.addItemToCarryBox(localStorage.email, itemId).subscribe(data => {
      if (data)
        this.logger.logStatus("Item "+itemId+" added to Carry Box Successfully !!");
        this.getCarryBoxDetails();
    })
  }


  // To decrease the quantity of an item in the carry box
  decreaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);
    if (this.temp > 1) {
      this.service.updateItemInCarryBox(localStorage.email, itemId, this.temp - 1).subscribe(data => {
        if (data) {
          this.logger.logStatus("Item "+itemId+" updated in Carry Box Successfully !!");
          this.getCarryBoxDetails()
        }
      },
        err => {
          this.logger.logStatus("Error in updating Item "+itemId+" !!");
          
        })
    }
    else {
      this.removeCarryBoxItem(itemId);
    }
  }


  // To increase the quantity of an item in the carry box
  increaseQuantity(itemId: number) {
    this.temp = this.filterCarryBoxItems.transform(this.carryBox.itemlist, itemId);
    this.service.updateItemInCarryBox(localStorage.email, itemId, this.temp + 1).subscribe(data => {
      if (data) {
        this.logger.logStatus("Item "+itemId+" updated Successfully !!");
        this.getCarryBoxDetails()
      }
    },
      err => {
        this.logger.logStatus("Error in updating Item "+itemId+" !!");
      })
  }


  // To remove an item from the carry box when not needed
  removeCarryBoxItem(itemId: number) {
    this.service.deleteACarryBoxItem(localStorage.email, itemId).subscribe(data => {
      if (data) {
        this.getCarryBoxDetails();
        this.logger.logStatus("Item "+itemId+" removed from the Carry Box Successfully !!");
      }
    })
  }


  // To remove all the items in the carry box
  clearTheCarryBox() {
    if (confirm("Are you sure want to delete all the items in the Carry Box?")) {
      this.service.clearTheCarryBox(localStorage.email).subscribe(data => {
        if (data) {
          this.getCarryBoxDetails();
          this.logger.logStatus(" Carry Box is cleared Successfully !!");
        }
      })
    }
    else
      return
  }


  // To navigate back to home page
  goToHome() {
    this.router.navigate([''])
    this.logger.logStatus("Navigating to Home Page !!");
  }


  // To navigate to carry box page
  goToCarryBox() {
    this.router.navigate(["customer/myCarryBox"])
    this.logger.logStatus("Navigating to Carry Box Page !!");
  }


  // To navigate to place order page when buy now option is selected
  placeOrder() {
    if(localStorage.location==2001){
      this.branch="Hyderabad"
    }
    else if(localStorage.location==2002){
      this.branch="Chennai"
    }
    if(localStorage.location==2003){
      this.branch="Bangalore"
    }
      this.logger.logStatus("Navigating to Place Order Page !!");
      this.router.navigate(["customer/placeOrder"])  
  }


  // Navigating to login page when not user is not logged in
  login(){
    this.router.navigate(['authenticate'])
  }
  
}

