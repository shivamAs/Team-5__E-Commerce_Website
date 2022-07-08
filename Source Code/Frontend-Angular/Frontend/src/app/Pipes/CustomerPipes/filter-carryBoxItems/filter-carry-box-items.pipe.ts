import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../../Models/Item';

@Pipe({
  name: 'filterCarryBoxItems'
})


/* Method:FilterCarryBoxItemsPipe
	 * Description: Called from items page and carry box page to retrieve the quantity of that item in the carrybox
	 * @param Item[]:carryBoxItems
	 * @param int: itemId
	 * @return int: quantity is returned
	*/
export class FilterCarryBoxItemsPipe implements PipeTransform {

  transform(carryBoxItems:Item[], itemId:number) {
    for(let i=0;i<carryBoxItems.length;i++){
      if(carryBoxItems[i].itemId==itemId)
        return carryBoxItems[i].quantity
    }
    return 0;
  }
}
