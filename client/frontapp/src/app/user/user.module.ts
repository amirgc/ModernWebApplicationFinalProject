import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "./../material-components.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule } from "@ngrx/store";
import { ScrollbarModule } from "./scrollbar/scrollbar.module";

import { UsermainComponent } from "./usermain/usermain.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ToolbarComponent } from "./toolbar/toolbar.component";
import { SidepanelComponent } from "./sidepanel/sidepanel.component";
import { MenutabComponent } from "./menutab/menutab.component";
import { MenumainComponent } from "./menumain/menumain.component";

import { ItemSelectPopupComponent } from "./item-select-popup/item-select-popup.component";

import { DishListService } from "./menutab/dish-list.service";
import { OrderService } from "./sidepanel/order.service";

import { reducer } from "./../redux/orders.reducer";

@NgModule({
  declarations: [
    UsermainComponent,
    HomeComponent,
    ToolbarComponent,
    SidepanelComponent,
    MenutabComponent,
    MenumainComponent,
    ItemSelectPopupComponent
  ],
  entryComponents: [ItemSelectPopupComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ScrollbarModule,
    StoreModule.forRoot({ order: reducer })
  ],
  providers: [DishListService, OrderService]
})
export class UserModule {}
