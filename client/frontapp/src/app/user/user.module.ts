import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "./../material-components.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { UsermainComponent } from "./usermain/usermain.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { SidepanelComponent } from "./sidepanel/sidepanel.component";
import { MenutabComponent } from "./menutab/menutab.component";
import { MenumainComponent } from "./menumain/menumain.component";

@NgModule({
  declarations: [
    UsermainComponent,
    HomeComponent,
    ToolbarComponent,
    SidepanelComponent,
    MenutabComponent,
    MenumainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ]
})
export class UserModule {}
