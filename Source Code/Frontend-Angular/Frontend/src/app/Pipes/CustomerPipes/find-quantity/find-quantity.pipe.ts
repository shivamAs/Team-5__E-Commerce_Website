import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findQuantity'
})
export class FindQuantityPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
