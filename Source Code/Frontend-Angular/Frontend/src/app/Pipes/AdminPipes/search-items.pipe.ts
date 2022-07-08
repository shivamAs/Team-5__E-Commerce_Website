import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../Models/Item';

@Pipe({
  name: 'searchItems'
})
export class SearchItemsPipe implements PipeTransform {

  transform(items: any, searchText:any) {
    if(searchText!="")
    items=items.filter(e=>(e['itemName'].toLowerCase().includes(searchText.toLowerCase())))
    return items;
  }

}
