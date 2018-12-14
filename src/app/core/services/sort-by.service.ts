import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortByService {

  constructor() { }

  sortBy(cars: [], sortValue: string, isAsc?: boolean): [] {
    if (isAsc) {
      return cars.sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : ((b[sortValue] > a[sortValue]) ? -1 : 0));
    } else {
      return cars.sort((a, b) => (a[sortValue] < b[sortValue]) ? 1 : ((b[sortValue] < a[sortValue]) ? -1 : 0));
    }
  }
}
