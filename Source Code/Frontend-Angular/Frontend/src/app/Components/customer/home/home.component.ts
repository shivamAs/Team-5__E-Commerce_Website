import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';
import { LoggingService } from '../../../Models/LoggingService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poster1: Boolean = false;
  poster2: Boolean = false;
  poster3: Boolean = false;
  constructor(private router:Router,private customer:CustomerComponent, private logger:LoggingService) { }

  ngOnInit() {
    this.customer.expandHeader()
    this.customer.searchText=""
    this.customer.filter=""

    this.poster2 = true
    this.changingContents()
  }


  // Changing the posters with a particular time limit
  changingContents() {

    // Changing to poster1 when poster3 is in display
    if (this.poster3 == true) {
      setTimeout(() => {
        document.getElementById("poster3").style.opacity="0";
        setTimeout(() => {
          this.poster3 = false;
          this.poster1 = true;     
            setTimeout(() => {
              document.getElementById("poster1").style.opacity="1";
              this.changingContents();                
            }, 1500);
        }, 1500);
      }, 11000);
    }

    // Changing to poster2 when poster1 is in display
    else if (this.poster1 == true) {
      setTimeout(() => {
        document.getElementById("poster1").style.opacity="0";
        setTimeout(() => {
          this.poster1 = false;
          this.poster2 = true;            
          setTimeout(() => {
            document.getElementById("poster2").style.opacity="1";
            this.changingContents();            
          }, 1500);
        }, 1500);
      }, 9500);
    }    

    // Changing to poster3 when poster2 is in display 
    else if (this.poster2 == true) {
      setTimeout(() => {
        document.getElementById("poster2").style.opacity="0";
        setTimeout(() => {
          this.poster2 = false;
          this.poster3=true;      
          setTimeout(() => {
            document.getElementById("poster3").style.opacity="1";
            this.changingContents();              
          }, 1500);
        }, 1500);
      }, 9500);
    }
  } 


  // Navigating to Items Page
  goToItems(){
    this.customer.filter="Biryanis"
    this.customer.goToItems();
    this.logger.logStatus("Navigating to Items Page !!");

  }


  // Navigating to Signup page
  goToSignUp(){
    this.router.navigate(['authenticate/sign-up'])
    this.logger.logStatus("Navigating to Sign Up Page !!");

  }
}
