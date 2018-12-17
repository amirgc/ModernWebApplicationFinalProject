import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, OrderComponent],
  imports: [CommonModule, RouterModule]
})
export class AdminModule {}
