import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCarPipe } from './pipes/search-car.pipe';

@NgModule({
  declarations: [SearchCarPipe],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
