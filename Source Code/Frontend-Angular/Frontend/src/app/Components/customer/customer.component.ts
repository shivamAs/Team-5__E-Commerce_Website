import { Component, OnInit, ɵɵtextInterpolateV, ɵɵtextInterpolate8 } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../../Models/LoggingService';
import { CustomerServiceService } from '../../Services/customer-service/customer-service.service';
import { SubCategory } from '../../Models/subCategory';
import { Category } from '../../Models/Category';
import { BranchDto } from '../../Models/BranchDto';
import { CarryBox } from '../../Models/CarryBox';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  carryBox: CarryBox
  branches: BranchDto[]
  currentLocation: number
  currentBranch: string
  showPopup: boolean
  filter: string = ""
  searchText: string = "";
  showMenu: boolean = false
  userLoggedIn: boolean = false
  showLogo: boolean = true
  categoryList: Category[]
  subCategories: SubCategory[]

  constructor(private router: Router, private logger: LoggingService, private service: CustomerServiceService) { }
  ngOnInit() {

    this.getAllBranches()

    //To check whether the user is logged in or not
    if (localStorage.email != "") {
      this.userLoggedIn = true
      // this.getCarryBoxDetails()
    }

    this.showPopup = false
    this.router.navigate(["customer"])


    // Setting Hyderabad branch as default on opening the site
    setTimeout(() => {
      if (localStorage.location == 0) {
        localStorage.location = 2001
        this.currentLocation = 2001
        this.currentBranch = "Bangalore"
        this.getABranchSubCategories();
        this.getABranchCategories();
      }
      else {
        this.currentLocation = localStorage.location
        this.changeLocation()
      }
      this.expandHeader()

    }, 1000);

    this.filter = ""
    this.searchText = ""

  }

  //To navigate to items page with a filter
  goToItems() {
    this.compressHeader()
    this.router.navigate(["/customer/items/category/" + this.filter])
    this.logger.logStatus("Navigating to " + this.filter + " items page!!");
  }


  //To navigate to items page with by searching
  goToSearchItems() {
    if (this.searchText != "") {
      this.compressHeader()
      this.router.navigate(["/customer/items/search/" + this.searchText])
      this.logger.logStatus("Searching for '" + this.searchText + "' items !!");
    }
  }


  //To reduce the height of the header and remove the menu buttons when navigating to 
  //Items poage, orders page,carry box etc.,
  compressHeader() {
    if (screen.availWidth > 800) {
      document.getElementById("header-bottom1").style.display = "none";
      document.getElementById("mainLogo").style.display = "flex";
      document.getElementById("homeBtn").style.display = "none";
    }
    else {
      document.getElementById("mainLogo").style.display = "none";
      document.getElementById("homeBtn").style.display = "flex";
      document.getElementById("header-bottom2").style.display = "none";
    }

    document.getElementById("header").style.height = "15vh";
    document.getElementById("header").style.opacity = "1";
  }


  //To increase the height of the header and add the menu buttons when navigated to Home page
  expandHeader() {
    if (screen.availWidth > 800) {
      document.getElementById("header-bottom1").style.display = "flex";
      document.getElementById("mainLogo").style.display = "flex";
      document.getElementById("homeBtn").style.display = "none";
    }
    else {
      document.getElementById("mainLogo").style.display = "flex";
      document.getElementById("homeBtn").style.display = "none";
      document.getElementById("header-bottom2").style.display = "flex";
    }

    if (screen.availWidth > 600) {
      document.getElementById("header").style.height = "20vh";
    }
    else {
      document.getElementById("header").style.height = "15vh";
    }

    document.getElementById("header").style.opacity = "1";
  }

  //To navigate to home page
  goToHome() {
    this.expandHeader()
    this.router.navigate(["customer"])
    this.logger.logStatus("Navigating to Home page!!");
  }


  //To navigate to My Orders Page
  goToMyOrders() {
    this.closeMenu()
    this.compressHeader()
    this.router.navigate(["customer/myAccount"])
    this.logger.logStatus("Navigating to My Orders Page!!");
  }


  //To navigate to carrybox page
  goToMyCarryBox() {
    this.closeMenu()
    this.compressHeader()
    this.router.navigate(["customer/myCarryBox"])
    this.logger.logStatus("Navigating to Carry Box Page!!");
  }


  //To remove the header during placing an order
  removeHeader() {
    document.getElementById("header").style.height = "0vh";
    document.getElementById("header").style.opacity = "0";
  }


  //To navigate to items page with filter of categories
  setFilter(filter: string) {
    this.filter = filter
    this.goToItems()
    this.logger.logStatus("Navigating to " + filter + " Items page!!");
  }

  //To show the user menu options
  openMenu() {
    this.showMenu = true
    document.getElementById("menuExtension").style.height = "30vh"
    document.getElementById("menuExtension").style.width = "30vh"
  }


  //To close the user menu options
  closeMenu() {
    this.showMenu = false
    document.getElementById("menuExtension").style.height = "5vh"
    document.getElementById("menuExtension").style.width = "5vh"
  }


  //To navigate to login page
  login() {
    this.router.navigate(['authenticate'])
    this.logger.logStatus("Navigating to Login Page!!");
  }


  //To logout and navigate to home page
  logout() {
    this.closeMenu()
    this.userLoggedIn = false
    localStorage.email = "";
    this.router.navigate([''])
    this.logger.logStatus("User Logged out!!");
  }


  // To display the change location option
  setLocation() {

    // To check and warn the user about clearing the carry box
    if (localStorage.email != "") {
      this.service.getCarryBoxDetails(localStorage.email).subscribe(data => {
        if (data.itemlist.length > 0) {
          if (confirm("Changing the Location will remove all the selected items in the carrybox. \n Do you wish to continue?")) {
            this.showPopup = true
          }
        }
        else {
          this.showPopup = true;
        }
      })
    }
    else {
      this.showPopup = true
    }
  }


  // To change the Location
  changeLocation() {
    this.showPopup = false
    localStorage.location = this.currentLocation
    if (localStorage.email != "")
      this.clearTheCarryBox();
    
    this.router.navigate(['customer'])
    this.getABranchCategories()
    this.getABranchSubCategories()
    for (let i = 0; i < this.branches.length; i++) {
      if (this.currentLocation == this.branches[i].branchId) {
        this.currentBranch = this.branches[i].branchCity
        break;
      }
    }
    this.logger.logStatus("Location is changed to '" + this.currentBranch+" !!");
  }


  // To close the change location option without any change
  closePopup() {
    this.showPopup = false
  }


  // To remove all the items in the carry box
  clearTheCarryBox() {
    this.service.clearTheCarryBox(localStorage.email).subscribe(data => {
      if (data) {
        this.logger.logStatus(" Carry Box is cleared Successfully !!");
      }
    },
    err=>{
      this.logger.logStatus("Error while clearing the carry box !!");
    })
  }


  // To retrieve all the Categories existing in a branch
  getABranchCategories() {
    this.service.getABranchCategoryList(this.currentLocation).subscribe(data => {
      this.categoryList = data
      this.logger.logStatus("Retrieved all the categories in a branch !!");
    })
  }


  // To retrieve all the sub categories existing in a branch
  getABranchSubCategories() {
    this.service.getABranchCategories(this.currentLocation).subscribe(data => {
      this.subCategories = data
      this.logger.logStatus("Retrieved all the sub-categories in a branch !!");
    })
  }


  // To retrieve all the existing branches
  getAllBranches() {
    this.service.getAllBranches().subscribe(data => {
      this.branches = data
      console.log(data[0].branchRegion);
      console.log(data[0].branchRegion);
      console.log(data[0].branchRegion);
      
      this.logger.logStatus("Retrieved all the branches details !!");
    },
    err=>{
      this.logger.logStatus("Error while retrieving the branches !!");
    })
  }



}
