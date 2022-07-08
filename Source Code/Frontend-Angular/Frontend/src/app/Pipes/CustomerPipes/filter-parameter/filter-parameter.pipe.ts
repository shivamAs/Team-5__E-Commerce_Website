import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../../Models/Item';

@Pipe({
  name: 'filterParameter'
})
export class FilterParameterPipe implements PipeTransform {

  transform(items: Item[], filter2:string) {
    if(filter2=="non-veg"){
      items=items.filter(e=>e.type=='non-veg')
    }
    else if(filter2=="veg"){
      items=items.filter(e=>e.type=='veg')
    }
    else if(filter2=="active"){
      items=items.filter(e=>e.active==true)
    }
    
    return items;
  }

}
