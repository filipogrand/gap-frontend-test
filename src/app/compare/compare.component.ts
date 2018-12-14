import { Component, OnInit } from '@angular/core';
import { SessionService } from '../core/services/session.service';
import { environment } from './../../environments/environment';
import { SortByService } from './../core/services/sort-by.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  compareCars = [];
  detailsComparation = [];
  imagePath = environment.image_path;

  constructor(
    private sessionService: SessionService,
    private sortByService: SortByService
  ) { }

  ngOnInit() {
    this.getDataToCompare();
  }

  getDataToCompare() {
    this.compareCars = this.sessionService.get('compareCars');

    enum carDetails { color, fuel, route, 'car id', steering, engine, negotiable, 'engine repaired', transmition }

    // Prepare object to compare all cars
    this.detailsComparation = this.compareCars[0]['details'].map(
      detail => new Object({ 'label': detail.label, 'values': [] })
    );

    // Sort and populate array with compare data
    for (const compare of this.compareCars) {
      const index = this.compareCars.indexOf(compare);
      let detailsArray = this.compareCars[index]['details'];

      detailsArray = this.sortByService.sortBy(compare['details'], 'id', true);

      for (const keyDetail of detailsArray) {
        this.detailsComparation.filter(find => {
          if (find.label === keyDetail.label) {
            find.values.push(keyDetail.value);
          }
        });
      }

    }
  }
}
