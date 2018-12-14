import { Component, OnInit } from '@angular/core';
import { RequestService } from './../core/services/request.service';
import { Cars } from '../core/interfaces/cars';
import { SortByService } from '../core/services/sort-by.service';
import { SessionService } from '../core/services/session.service';
import { Car } from '../core/classes/car';
import { environment } from './../../environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  response: Cars;
  headers: {};
  error: {};
  search = '';
  compareCars = [];

  imagePath = environment.image_path;

  constructor(
    private requestService: RequestService,
    private sortByService: SortByService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.callCarsResponse();
  }

  // Get data and information for cars, directly from service
  callCarsResponse() {
    this.requestService.getCars()
      .subscribe(resp => {
        const keys = resp.headers.keys();

        // Headers
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
        this.response = { ...resp.body };

        // Sort Cars by make ASC
        this.sortByService.sortBy(this.response['cars'], 'make', true);
      });
  }

  // Activate when user click on specific car selection
  selectCar(car: Car) {
    this.sessionService.set('carDetail', car, true);
  }

  // Activate when user click on button compare in each card for car
  activateCompare(car: Car) {
    const validation = 'Max 3 models at the same time!';

    if (this.compareCars.length <= 3) {
      if (car['readyForCompare']) {
        car['readyForCompare'] = false;
        const index = this.compareCars.indexOf(car);
        this.compareCars.splice(index, 1);
      } else {
        if (this.compareCars.length < 3) {
          car['readyForCompare'] = true;
          this.compareCars.push(car);

          // If user at least select 2 or 3 cars, show sweet alert asking for compare
          if (this.compareCars.length >= 2 && this.compareCars.length <= 3) {
            let textToShow = `You have selected ${this.compareCars.length} cars.`;
            textToShow = (this.compareCars.length === 3) ? textToShow + ` ${validation}` : textToShow;
            swal({
              text: textToShow,
              title: 'Are you ready to compare cars?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Sure!',
              cancelButtonText: 'Wait!, not yet'
            }).then((result) => {
              if (result.value) {
                window.scroll(0, 0);
                this.router.navigate(['./compare']);
              }
            });
          }
        } else {
          swal({
            text: 'Compare only available for max 3 models',
            title: validation,
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok, Fine!',
          });
        }
      }
    }
    // Set all compare cars in session
    this.sessionService.set('compareCars', this.compareCars, true);
  }
}
