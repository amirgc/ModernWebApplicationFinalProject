import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrderLine } from "./../../_models/order.model";
import { DishListService } from "../menutab/dish-list.service";

@Component({
  selector: "app-item-select-popup",
  templateUrl: "./item-select-popup.component.html",
  styleUrls: ["./item-select-popup.component.scss"]
})
export class ItemSelectPopupComponent implements OnInit {
  message: string;
  selectedItemType: any;
  selectedItemSize: any;
  selectedDish: any;
  itemimage: string;
  qty: number;
  ingredients: any[] = [];
  ingredientsDisplayText: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<ItemSelectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dishListService: DishListService
  ) {
    this.qty = 1;
    console.log(JSON.stringify(data));
    this.selectedDish = data.item;
    this.itemimage = data.item.image;
    this.description = data.item.description;
    // These Item Type and Size is bounded with front end
    this.selectedItemType = this.selectedDish.types[0];
    this.selectedItemSize = this.selectedItemType.sizes[0];
    this.getIngredients();
  }

  dishChanges(event) {
    this.selectedItemType = event.value;
    this.selectedItemSize = this.selectedItemType.sizes[0];
    this.getIngredients();
  }

  getIngredients() {}

  ngOnInit() {}

  changeQuantity(i) {
    if (this.qty === 0 && i === -1) {
      this.qty = 0;
    } else {
      this.qty = this.qty + i;
    }
  }

  addItemToCart() {
    this.dialogRef.close("");
  }
}
