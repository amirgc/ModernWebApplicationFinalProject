import { Component, OnInit, ViewChild } from '@angular/core';
import { DishService } from './dish.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dishlist',
  templateUrl: './dishlist.component.html',
  styleUrls: ['./dishlist.component.scss']
})
export class DishlistComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['position', 'name', 'Description', 'Category'];

  constructor(private dishservice: DishService ) {}

  ngOnInit() {
    console.log('DishlistComponent -- ngOnInit');
    this.dishservice.getDishList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);
    })  
    
  }

  applyFilter(filterValue: string) {
    console.log('applyFilter -- ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
