import { Component, OnInit } from '@angular/core';
import { Car } from '../core/classes/car';
import { SessionService } from '../core/services/session.service';
import { SortByService } from '../core/services/sort-by.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  car: Car;
  imagePath = environment.image_path;

  constructor(
    private sessionService: SessionService,
    private sortByService: SortByService
  ) { }

  ngOnInit() {
    this.getCarDetail();
  }

  getCarDetail() {
    window.scroll(0, 0);
    this.car = this.sessionService.get('carDetail');
    this.car['details'] = this.sortByService.sortBy(this.car['details'], 'id', true);
  }
}
