import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "./../material-components.module";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrderComponent } from "./order/order.component";
import { MainComponent } from "./main/main.component";
import { HttpClientModule } from "@angular/common/http";
import { OrderdetailsComponent } from "./order/orderdetails/orderdetails.component";
// import { DishComponent } from './dishlist/dish.component';
import { DishesComponent } from "./dishlist/dishes.component";
import { AddDialogComponent } from "./dishlist/add/add.dialog.component";
import { EditDialogComponent } from "./dishlist/edit/edit.dialog.component";
import { DeleteDialogComponent } from "./dishlist/delete/delete.dialog.component";
import { DishService } from "./dishlist/dish.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    OrderComponent,
    OrderdetailsComponent,
    MainComponent,
    DashboardComponent,
    DishesComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MaterialComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DishService],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ]
})
export class AdminModule {}
