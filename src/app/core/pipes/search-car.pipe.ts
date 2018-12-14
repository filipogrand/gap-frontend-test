import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCar'
})
export class SearchCarPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): Array<any> {
    if (typeof args[0] === 'undefined' || args[0] === '') {
      return value;
    } else {
      const result = value.filter(obj => obj['make'].toLowerCase().match((args[0]).toLowerCase()));
      return result;
    }
  }
}
