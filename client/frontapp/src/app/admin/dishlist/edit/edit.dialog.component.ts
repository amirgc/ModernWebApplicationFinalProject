import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { DishService } from '../dish.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditDialogComponent {
  categories: String[] = ['Main Dish', 'Bevarage', 'Dessert'];
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dishService: DishService) {
                // console.log('--EditComponent--')
                // console.log(data);
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

  stopEdit(): void {
    console.log(this.data);
    this.dishService.updateDish(this.data).subscribe(result => {
      console.log(result);
    });    
  }
}
