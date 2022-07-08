import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../../Models/Order';

@Pipe({
  name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {

  count:number
  transform(orders:Order[], orderId:number) {
    this.count=0
    for(let i=0;i<orders.length;i++){
      if(orders[i].orderId==orderId)
        this.count++
    }
    return this.count;
  }

}
