import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DishComponent } from './dish/dish.component';
import { DishlistComponent } from './dishlist/dishlist.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, DishComponent, DishlistComponent],
  imports: [CommonModule, RouterModule]
})
export class AdminModule {}
