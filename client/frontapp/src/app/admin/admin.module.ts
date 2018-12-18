import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";

import { OrderComponent } from './order/order.component';
import { DishComponent } from './dish/dish.component';
import { DishlistComponent } from './dishlist/dishlist.component';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { OrderdetailsComponent } from './order/orderdetails/orderdetails.component'


@NgModule({
    declarations: [MainComponent, DashboardComponent, DishComponent, DishlistComponent,OrderComponent, OrderdetailsComponent],
    imports: [CommonModule, RouterModule, MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,HttpClientModule]
  })
export class AdminModule { }
