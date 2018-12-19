import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { DishService } from '../dish.service';
import {FormControl, Validators} from '@angular/forms';
import { Dish } from '../model/dish';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddDialogComponent {
  categories: String[] = ['Main Dish', 'Bevarage', 'Dessert'];
  images: String[] = [
    'https://api.tsfoodland.com/images/desktop/2dee7e71-de24-460c-b4a9-5b9af8c10591_ChickenTandoori.jpg',
    'https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg',
    'https://i1.wp.com/www.eatthis.com/wp-content/uploads/media/images/ext/446341906/fast-food-burger-fries.jpg',
    'http://c3.thejournal.ie/media/2012/10/burger-and-chips-390x285.jpg',
    'https://vignette.wikia.nocookie.net/food-lovers/images/3/3b/Which-breakfast-food-are-you-aug-3-2012-2-600x400.jpg',
    'https://i.ytimg.com/vi/zigTgCmsZGc/maxresdefault.jpg',
    'https://www.recipesaresimple.com/wp-content/uploads/2018/09/easy-kerala-chicken-fry-1000x500.jpg',
    'https://peacockelite.com/wp-content/uploads/2017/05/chicken-fry.jpg',
    'http://dailyorange.com/resize/800/wp-content/uploads/2018/02/18220715/Courtesy_Dangs-Cafe.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm64qgRK4ImDYUeoK7LE5c-QDiNHikzCt8h15AFbfwf9pZJsqokQ'
  ];
  
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dish,
              public dishService: DishService) { 
                data.image = this.images[Math.floor(Math.random() * 9)];
              }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log('--starting confirmAdd--');
    this.dishService.createDish(this.data);
    this.dishService.createDish(this.data).subscribe(result => {
      console.log(result);
    })
    console.log('--ending confirmAdd--');
  }
}
