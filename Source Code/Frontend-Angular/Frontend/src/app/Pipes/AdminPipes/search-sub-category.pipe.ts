import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSubCategory'
})
export class SearchSubCategoryPipe implements PipeTransform {

  transform(subCategoryList: any, searchText: any): any {
    let newList: any;

    if (searchText) {
      newList = subCategoryList.filter(subCategory => subCategory.subCategoryName.toLowerCase().startsWith(searchText.toLowerCase()));
    }
    else {
      newList = subCategoryList;
    }
    return newList;
  }
  }

