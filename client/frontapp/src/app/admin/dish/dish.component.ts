import { Component, OnInit } from '@angular/core';
import { DishService } from '../dishlist/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  categories: String[] = ['Main Dish', 'Bevarage', 'Dessert'];
  constructor(private dishService: DishService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('onSubmit');
    
    this.dishService.createDish().subscribe(result => {
      console.log(result);
    })
    return false;
  }

}
