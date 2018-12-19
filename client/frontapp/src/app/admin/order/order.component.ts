import { Component, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MyoudersService } from "./myouders.service";
import { OrderModel } from "./ordermodel";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  ELEMENT_DATA: OrderModel[];
  dataSource = new MatTableDataSource<OrderModel>();
  displayedColumns: string[] = [
    "_id",
    "totalAmount",
    "userid",
    "discount",
    "status",
    "mybutton"
  ];
  data: OrderModel[];

  myorders;
  constructor(
    private orderService: MyoudersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.orderService.getMyOrder().subscribe(res => {
      this.data = res.map(x => {
        const test = {
          _id: x._id,
          totalAmount: x.totalAmount,
          userid: x.user.name,
          discount: x.discount,
          status: x.status,
          mybutton: "See Details"
        };
        return test;
      });
      this.dataSource = new MatTableDataSource<OrderModel>(this.data);
    });
  }

  navigate(id) {
    const dialogRef = this.dialog.open(OrderdetailsComponent, {
      width: "800px",
      height: "auto",
      data: { id }
    });
  }
}