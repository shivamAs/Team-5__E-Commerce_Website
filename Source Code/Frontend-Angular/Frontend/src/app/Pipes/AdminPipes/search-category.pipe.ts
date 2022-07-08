import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(categoryList: any, searchText: any): any {
    let newList: any;

    if (searchText) {
      newList = categoryList.filter(category => category.categoryName.toLowerCase().startsWith(searchText.toLowerCase()));
    }
    else {
      newList = categoryList;
    }
    return newList;
  }
  }


