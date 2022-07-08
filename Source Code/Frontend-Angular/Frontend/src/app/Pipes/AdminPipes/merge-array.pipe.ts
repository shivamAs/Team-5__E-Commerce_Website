import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeArray'
})
export class MergeArrayPipe implements PipeTransform {

  transform(arr1: any, arr2: any): any {
    var arr = [];
      arr1.forEach((data, active) => {
      arr.push({ state: data, active_status: arr2[active] });
    });
    return arr;
  }

}
