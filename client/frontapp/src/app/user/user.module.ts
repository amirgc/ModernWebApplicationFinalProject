import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsermainComponent } from "./usermain/usermain.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidepanelComponent } from "./sidepanel/sidepanel.component";
import { MenutabComponent } from "./menutab/menutab.component";

@NgModule({
  declarations: [
    UsermainComponent,
    HomeComponent,
    ToolbarComponent,
    DashboardComponent,
    SidepanelComponent,
    MenutabComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class UserModule {}
