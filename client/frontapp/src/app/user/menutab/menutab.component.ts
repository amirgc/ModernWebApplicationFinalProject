import { Component, OnInit } from "@angular/core";
import { GlobalService } from "./../../_services/globale-variable.services";
import { DishListService } from "./../../_services/dish-list.service";

@Component({
  selector: "app-menutab",
  templateUrl: "./menutab.component.html",
  styleUrls: ["./menutab.component.scss"]
})
export class MenutabComponent implements OnInit {
  allDishList: any;
  selectedDishList: any;
  constructor(
    private dishListService: DishListService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.globalService.setShowLoader(true);
    this.dishListService.getDishList().subscribe(result => {
      this.allDishList = result;
      this.selectedDishList = this.allDishList;
      console.log(result);
      this.globalService.setShowLoader(false);
    });
  }
}
