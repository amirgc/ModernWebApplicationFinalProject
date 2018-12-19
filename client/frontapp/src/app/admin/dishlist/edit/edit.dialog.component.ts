import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, Inject, OnChanges } from "@angular/core";
import { DishService } from "../dish.service";
import { FormControl, Validators } from "@angular/forms";
import { DishModel, DishTypeModel, DishSizeModel } from "../add/dish.model";

@Component({
  selector: "app-baza.dialog",
  templateUrl: "./edit.dialog.html",
  styleUrls: ["./edit.dialog.css"]
})
export class EditDialogComponent implements OnChanges {
  categories: String[] = [
    "Main Dish",
    "Bevarage",
    "Dessert",
    "Italian",
    "Fast Food"
  ];
  dish: DishModel;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dishService: DishService
  ) {
    // console.log('--EditComponent--')
    console.log(data);
    this.dish = new DishModel();
    for (let i = 0; i < this.data.types.length; i++) {
      this.dish.types.push(this.data.types[i]);
    }
  }

  formControl = new FormControl("", [
    Validators.required
    // Validators.email,
  ]);

  ngOnChanges() {}

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    console.log(this.data);
    this.data.types = this.dish.types;
    this.dishService.updateDish(this.data).subscribe(result => {
      console.log(result);
    });
  }

  addType(): void {
    const dishType: DishTypeModel = new DishTypeModel();
    const dishSize: DishSizeModel = new DishSizeModel();
    dishType.sizes.push(dishSize);
    this.dish.types.push(dishType);
  }

  removeType(type): void {
    if (this.dish.types.length !== 1) {
      this.dish.types.splice(this.dish.types.findIndex(x => x === type), 1);
    } else {
      // Can't delete
    }
  }

  addSize(type): void {
    this.dish.types[this.dish.types.findIndex(x => x === type)].sizes.push(
      new DishSizeModel()
    );
  }

  removeSize(type, size): void {
    if (
      this.dish.types[this.dish.types.findIndex(x => x === type)].sizes
        .length !== 1
    ) {
      this.dish.types[this.dish.types.findIndex(x => x === type)].sizes.splice(
        this.dish.types[
          this.dish.types.findIndex(x => x === type)
        ].sizes.findIndex(x => x === size),
        1
      );
    } else {
      // Can't delete
    }
  }
}
