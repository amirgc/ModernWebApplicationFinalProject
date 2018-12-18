import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrderLineModel } from "./../../admin/order/orderLineModel";
import { State } from "./../../redux/order.state";
import { Store } from "@ngrx/store";
import * as OrderActions from "./../../redux/orders.actions";

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
    private store: Store<State>
  ) {
    this.qty = 1;
    console.log(JSON.stringify(data));
    this.selectedDish = data.item;
    this.itemimage = data.item.image;
    this.description = data.item.description;
    // These Item Type and Size is bounded with front end
    this.selectedItemType = this.selectedDish.types[0];
    this.selectedItemSize = this.selectedItemType.sizes[0];
  }

  dishChanges(event) {
    this.selectedItemType = event.value;
    this.selectedItemSize = this.selectedItemType.sizes[0];
  }

  ngOnInit() {}

  changeQuantity(i) {
    if (this.qty === 0 && i === -1) {
      this.qty = 0;
    } else {
      this.qty = this.qty + i;
    }
  }
  delTutorial(index) {
    this.store.dispatch(new OrderActions.RemoveOrderLine(index));
  }
  addItemToCart() {
    console.log(this.selectedItemType, this.selectedItemSize);
    const orderLine = new OrderLineModel(
      this.selectedItemSize.price * this.qty,
      this.selectedDish.name,
      this.qty,
      this.selectedItemSize.price,
      this.selectedItemSize.size,
      this.selectedItemType.name,
      this.selectedDish.uom
    );
    console.log(orderLine);
    this.store.dispatch(new OrderActions.AddOrderLine(orderLine));
    // this.dialogRef.close("");
  }
}
