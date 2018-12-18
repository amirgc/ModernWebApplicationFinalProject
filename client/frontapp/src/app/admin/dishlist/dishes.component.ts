import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DishService } from './dish.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Dish } from './model/dish';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './add/add.dialog.component';
import {EditDialogComponent} from './edit/edit.dialog.component';
import {DeleteDialogComponent} from './delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit {
  displayedColumns = ['position', 'name', 'Description', 'Category', 'actions'];
  dataSource: MatTableDataSource<Dish>;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DishService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(dish: Dish) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {dish: Dish }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit( dish
    ) {
    console.log(dish);
    const dialogRef = this.dialog.open(EditDialogComponent, 
      {
      data: dish
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      // if (result === 1) {
        this.loadData();
      // }
    });
  }

  deleteItem( dish ) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dish
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.dataService.getDishList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);
    })  
  }
}

