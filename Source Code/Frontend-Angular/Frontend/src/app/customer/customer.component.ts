import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  filter: string = ""
  searchText: string = "";
  showMenu: boolean = false
  userLoggedIn: boolean = false
  showLogo:boolean = true

  constructor(private router: Router) { }
  ngOnInit() {
    this.filter = ""
    this.searchText = ""
    this.expandHeader()
    this.router.navigate(["customer"])
    // this.toggleLogo()
    if(localStorage.email!=""){
      // this.showMenu=true
      this.userLoggedIn=true
    }
    
  }

  toggleLogo(){
      this.showLogo=false
      setTimeout(() => {
        this.showLogo=true
      }, 1000);     
  }

  goToItems() {
    this.compressHeader()
    this.router.navigate(["/customer/items/category/" + this.filter])
  }

  goToSearchItems() {
    if (this.searchText != "") {
      this.compressHeader()
      this.router.navigate(["/customer/items/search/" + this.searchText])
    }
  }

  compressHeader() {
    if (screen.availWidth > 800) {
      document.getElementById("header-bottom1").style.display = "none";
    }
    else {
      document.getElementById("header-bottom2").style.display = "none";
    }
    if (screen.availWidth > 600) {
      // document.getElementById("title").style.fontSize = "30px";
      // document.getElementById("caption").style.fontSize = "15px";
    }
    else {
      // document.getElementById("title").style.fontSize = "20px";
      // document.getElementById("caption").style.fontSize = "10px";
    }

    document.getElementById("header").style.height = "10vh";
    document.getElementById("header").style.opacity = "1";
  }

  expandHeader() {
    if (screen.availWidth > 800) {
      document.getElementById("header-bottom1").style.display = "flex";
    }
    else {
      document.getElementById("header-bottom2").style.display = "flex";
    }

    if (screen.availWidth > 600) {
      document.getElementById("header").style.height = "20vh";
      // document.getElementById("title").style.fontSize = "50px";
      // document.getElementById("caption").style.fontSize = "25px";
    }
    else {
      document.getElementById("header").style.height = "15vh";
      // document.getElementById("title").style.fontSize = "20px";
      // document.getElementById("caption").style.fontSize = "10px";
    }

    document.getElementById("header").style.opacity = "1";
  }

  goToHome() {
    this.expandHeader()
    this.router.navigate(["customer"])
  }

  goToMyOrders() {
    this.closeMenu()
    this.compressHeader()
    this.router.navigate(["customer/myOrders"])
  }

  goToMyCarryBox() {
    this.closeMenu()
    this.compressHeader()
    this.router.navigate(["customer/myCarryBox"])
  }

  removeHeader() {
    document.getElementById("header").style.height = "0vh";
    document.getElementById("header").style.opacity = "0";
  }

  setFilter(filter: string) {
    this.filter = filter
    this.goToItems()
  }

  openMenu() {
    this.showMenu = true
    document.getElementById("menuExtension").style.height = "30vh"
    document.getElementById("menuExtension").style.width = "30vh"
  }

  closeMenu() {
      this.showMenu = false
      document.getElementById("menuExtension").style.height = "5vh"
      document.getElementById("menuExtension").style.width = "5vh"
  }

  login() {
    this.router.navigate(['authenticate'])
  }

  logout() {
    this.closeMenu()
    this.userLoggedIn = false
    localStorage.email="";
    this.router.navigate([''])
  }

}

