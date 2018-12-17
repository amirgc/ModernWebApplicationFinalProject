import { Component, OnInit } from "@angular/core";
import { GlobalService } from "./../../_services/globale-variable.services";
import { DishListService } from "./../../_services/dish-list.service";
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

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
  constructor(
    private dishListService: DishListService,
    private globalService: GlobalService
  ) {
    this.showOrderPanel = true;
    globalService.getShowHideOrderingList$.subscribe(value => {
      this.showOrderPanel = value;
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
  loadMenubyCategory() {
    this.categories = [{ categoryId: "Chinese" }, { categoryId: "Indian" }];
  }
}
