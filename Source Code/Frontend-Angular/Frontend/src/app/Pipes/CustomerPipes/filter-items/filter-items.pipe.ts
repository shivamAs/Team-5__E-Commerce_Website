import { Pipe, PipeTransform } from '@angular/core';
import { SubCategory } from '../../../Models/subCategory';

@Pipe({
  name: 'filterItems'
})


/* Method:FilterItemsPipe
	 * Description: Called from items page to filter a particular category of items
	 * @param Category[]:categories
	 * @param string: filter
	 * @return Item[]: filtered items are returned
*/
export class FilterItemsPipe implements PipeTransform {

  filteredItems: any = {}
  transform(categories: SubCategory[], filter: string) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].subCategoryName.toLowerCase() == filter.toLowerCase())
        this.filteredItems = categories[i].items
    }

    return this.filteredItems;
  }
}
