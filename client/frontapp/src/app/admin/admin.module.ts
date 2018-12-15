import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [CommonModule, RouterModule]
})
export class AdminModule {}
