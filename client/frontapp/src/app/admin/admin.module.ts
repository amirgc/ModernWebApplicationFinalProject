import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [CommonModule]
})
export class AdminModule {}
