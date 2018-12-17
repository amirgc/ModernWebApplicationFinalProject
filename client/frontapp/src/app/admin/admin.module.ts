import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DishComponent } from './dish/dish.component';
import { DishlistComponent } from './dishlist/dishlist.component';
import { MatTableModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatPaginatorModule,
  MatSelectModule  } from '@angular/material';
import { DishService } from './dishlist/dish.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MainComponent, DashboardComponent, DishComponent, DishlistComponent],
  imports: [CommonModule, RouterModule, MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatSelectModule,
    FormsModule],
  providers: [DishService]
})
export class AdminModule {}
