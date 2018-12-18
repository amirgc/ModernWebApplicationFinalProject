import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { ItemSelectPopupComponent } from "./../item-select-popup/item-select-popup.component";

import { GlobalService } from "./../../_services/globale-variable.services";
import { DishListService } from "./dish-list.service";
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";
import { Observable } from "rxjs";
import { OrderLineModel } from "src/app/admin/order/orderLineModel";
import { Store, select } from "@ngrx/store";
import { State } from "./../../redux/order.state";

@Component({
  selector: "app-menutab",
  templateUrl: "./menutab.component.html",
  styleUrls: ["./menutab.component.scss"],
  animations: [
    trigger("showOrderPanel", [
      state("true", style({ width: "calc(100% - 340px )" })),
      state("false", style({ width: "100%" })),
      transition("* => *", animate("200ms linear"))
    ])
  ]
})
export class MenutabComponent implements OnInit {
  allDishList: any;
  selectedDishList: any;
  showOrderPanel: boolean;
  categories = [];
  orderLines: Observable<OrderLineModel[]>;
  constructor(
    private dishListService: DishListService,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private store: Store<State>
  ) {
    // this.showOrderPanel = true;
    this.categories = [
      { categoryId: "Chinese" },
      { categoryId: "Indian" },
      { categoryId: "Thai" },
      { categoryId: "Italian" }
    ];
    globalService.getShowHideOrderingList$.subscribe(value => {
      this.showOrderPanel = value;
    });
    this.orderLines = store.pipe(select("order"));
    this.orderLines.subscribe(res => {
      if (res.length > 0) {
        this.globalService.setShowHideOrderingList(true);
      }
    });
  }

  ngOnInit() {
    this.globalService.setShowLoader(true);
    this.dishListService.getDishList().subscribe(result => {
      this.allDishList = result;
      this.selectedDishList = this.allDishList;
      console.log(result);
      this.globalService.setShowLoader(false);
    });
  }

  openItemSelectDialogue(item): void {
    const dialogRef = this.dialog.open(ItemSelectPopupComponent, {
      width: "800px",
      height: "auto",
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.globalService.setShowHideOrderingList(true);
      }
    });
  }
  loadMenubyCategory() {}
}
