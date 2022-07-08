import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../../Models/Item';

@Pipe({
  name: 'sortItems'
})
export class SortItemsPipe implements PipeTransform {

  temp:Item
  transform(items:Item[], sortBy:string){
    for(let i=0;i<items.length;i++){
      for(let j=0;j<items.length-i-1;j++){
        if(sortBy=='ascending'){
          if(items[j].itemPrice>items[j+1].itemPrice){
            this.temp=items[j]
            items[j]=items[j+1]
            items[j+1]=this.temp
          }  
        }
        else if(sortBy=='descending'){
          if(items[j].itemPrice<items[j+1].itemPrice){
            this.temp=items[j]
            items[j]=items[j+1]
            items[j+1]=this.temp
          }  
        }
        else if(sortBy=="")
        {
          if(items[j].itemId>items[j+1].itemId){
            this.temp=items[j]
            items[j]=items[j+1]
            items[j+1]=this.temp
          }  
        }
      }
    }
    return items;
  }

}
