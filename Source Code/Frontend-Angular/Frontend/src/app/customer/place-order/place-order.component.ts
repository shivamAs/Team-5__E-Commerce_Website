import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from '../customer.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CarryBox } from '../../../Models/CarryBox';
import { Address } from '../../../Models/address';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../Services/customer-service/customer-service.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  constructor(private customer:CustomerComponent, private service:CustomerServiceService, private router:Router) { }
  orderPlaced:boolean=false
  orderSuccess:boolean=true
  addresses:Address[]
  statusMsg:string=""
  carryBox:CarryBox
  selectedAddressId: number=0
  selectedPaymentType:string=""
  addNewAddress:boolean=false
  cityNotSelected:boolean=false
  addressFormSubmitted:boolean=false
  addAddressForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern('[6-9][0-9]{9}')])
  })

  ngOnInit() {
    this.customer.removeHeader()
    this.getCarryBoxDetails()
    this.getMyAddresses();
  }

  getCarryBoxDetails() {
    this.service.getCarryBoxDetails("sriharsha.p158@gmail.com").subscribe(data => {
      this.carryBox = data
      console.log("received Carry box details");
    },
      err => {
        console.log("error in retrieving carrybox details");
      })
  }

  getMyAddresses(){
    this.service.getMyAddresses("sriharsha.p158@gmail.com").subscribe(data=>{
      this.addresses=data.reverse()
      console.log("received addresses");      
    },
    err=>{
      console.log("error in retrieving addresses");
      
    })
  }

  setAddressId(addressId:number){
    for(let i=0;i<this.addresses.length;i++){
      document.getElementById(this.addresses[i].addressId.toString()).className="addressCard";
    }
    if(this.selectedAddressId!=addressId)
    {
      this.selectedAddressId=addressId
      this.addNewAddress=false
      document.getElementById(this.selectedAddressId.toString()).className="selectedAddressCard";
    }
    else 
      this.selectedAddressId=0
  }

  openAddressForm(){
    this.addNewAddress=true
    this.setAddressId(this.selectedAddressId)
  }

  closeAddressForm(){
    this.addNewAddress=false
    this.addressFormSubmitted=false
    this.addAddressForm.reset();
    this.cityNotSelected=false
  }

  addAddress(){
    this.addressFormSubmitted=true
    if(this.addAddressForm.controls.city.value=="")
    {
      this.cityNotSelected=true;
    }
    if(this.addAddressForm.invalid)
      return
    else
    {
      this.service.addANewAddress("sriharsha.p158@gmail.com",this.addAddressForm.value).subscribe(data=>{
        if(data){
          this.getMyAddresses();
          this.addNewAddress=false
          this.addAddressForm.reset()
          this.statusMsg="Address added Successfully!!"
          setTimeout(() => {
            this.statusMsg=""
          }, 2500);
        }
      })
    }
  }

  setPaymentType(type:string){
    document.getElementById("upi").className="left"
    document.getElementById("card").className="left"
    document.getElementById("net").className="left"
    document.getElementById("cod").className="left"

    document.getElementById(type).className="selectedType"
    this.selectedPaymentType=type
  }

  goToCarryBox(){
    this.router.navigate(['customer/myCarryBox'])
  }

  goToItems(){
    this.router.navigate(['customer/items/category/Biryanis'])
  }

  placeOrder(){
    if(this.selectedAddressId!=0){
      this.orderSuccess=false
      this.service.placeOrder("sriharsha.p158@gmail.com",2001,this.selectedAddressId).subscribe(data=>{
          console.log("order Placed");
          this.orderSuccess=true
          this.orderPlaced=true
          setTimeout(() => {
            this.router.navigate(['customer/trackOrder/'+data])            
          }, 6000);
      },
      err=>{
        setTimeout(() => {
          this.orderSuccess=false
          this.orderPlaced=true            
        }, 0);
        this.statusMsg=err.error.errorMessage
        console.log(err.error.errorMessage);
        

        console.log("error during placing the order");
        
      })
    }
  }

  resetAgain(){
    this.orderPlaced=false
    this.orderSuccess=true
    this.selectedAddressId=0
    this.statusMsg=""
    // this.setPaymentType(this.selectedPaymentType)
  }
}
