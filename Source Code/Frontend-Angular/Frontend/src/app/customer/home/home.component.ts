import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerComponent } from '../customer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poster1: Boolean = false;
  poster2: Boolean = false;
  poster3: Boolean = false;
  constructor(private router:Router,private customer:CustomerComponent) { }

  ngOnInit() {
    this.customer.expandHeader()
    this.customer.toggleLogo()
    this.customer.searchText=""
    this.customer.filter=""
    
    this.poster2 = true
    this.changingContents()
  }

  changingContents() {
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

}
