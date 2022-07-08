import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '../../../Models/subCategory';
import { CarryBox } from '../../../Models/CarryBox';
import { CustomerComponent } from '../customer.component';
import { FilterCarryBoxItemsPipe } from '../../../Pipes/CustomerPipes/filter-carryBoxItems/filter-carry-box-items.pipe';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  temp: any
  showContent: boolean = false
  heading: string = ''
  type: string
  items: any
  filter: string = ""
  categories: SubCategory[]
  carryBox: CarryBox
  filterCarryBoxItems = new FilterCarryBoxItemsPipe()
  constructor(private service: CustomerServiceService, private route: ActivatedRoute, private router: Router, private customer:CustomerComponent) {
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.type = params['type']  
      this.filter = params['filter']
      setTimeout(() => {
        if (this.type == 'category'){
          this.heading = this.filter
          document.getElementById("select").style.color="#29150e"    
        }
        else{
            this.searchItems();
            this.heading = "Search Results" 
            document.getElementById("select").style.color="grey"    
        }
      }, 250);

    })
    this.customer.compressHeader();
    this.getABranchCategories()
  }

  searchItems() {
    this.service.searchItems(2001, this.filter).subscribe(data => {
      this.items = data
      console.log("Received Items");
      console.log(this.items[0].subCategory);

    },
      err => {
        console.log("error in retrieving items");
      })
  }

  getABranchCategories() {
    this.service.getABranchCategories(2001).subscribe(data => {
      this.categories = data
      console.log("Received Categories")
      this.getCarryBoxDetails()
    },
      err => {
        console.log("error in retrieving categories");

      })
  }

  getCarryBoxDetails() {
    this.service.getCarryBoxDetails("sriharsha.p158@gmail.com").subscribe(data => {
      this.carryBox = data
      console.log("received Carry box details");
      this.showContent = true
    },
      err => {
        console.log("error in retrieving carrybox details");
      })
  }

  setFilter() {
    this.heading = ""
    this.customer.searchText=""
    this.router.navigate(["customer/items/category/" + this.filter])
  }


  addToCarryBox(itemId: number) {
    this.service.addItemToCarryBox("sriharsha.p158@gmail.com", itemId).subscribe(data => {
      if (data)
        console.log("Item added to carry box");
      this.getCarryBoxDetails();
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

  goToHome() {
    this.router.navigate([''])
  }

  goToCarryBox(){
    this.router.navigate(["customer/myCarryBox"])
  }

  placeOrder(){
    this.router.navigate(["customer/placeOrder"])
  }
}

