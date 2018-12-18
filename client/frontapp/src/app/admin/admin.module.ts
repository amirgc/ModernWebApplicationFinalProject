import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
// import { DishComponent } from './dishlist/dish.component';
import { DishesComponent } from './dishlist/dishes.component';
import { AddDialogComponent} from './dishlist/add/add.dialog.component';
import { EditDialogComponent } from './dishlist/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dishlist/delete/delete.dialog.component';
import { MatTableModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatPaginatorModule,
  MatSelectModule, 
  MatIconModule, MatToolbarModule, MatDialogModule} from '@angular/material';
import { DishService } from './dishlist/dish.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MainComponent, DashboardComponent, DishesComponent, 
    AddDialogComponent, EditDialogComponent, DeleteDialogComponent],
  imports: [CommonModule, RouterModule, MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule, MatToolbarModule, MatDialogModule],
  providers: [DishService],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
})
export class AdminModule {}
