import { Component, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MyoudersService } from "./myouders.service";
import { OrderModel } from "./ordermodel";
import { MatTableDataSource } from "@angular/material";

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
    "status"
  ];
  data: OrderModel[];

  myorders;
  constructor(private orderService: MyoudersService) {}

  ngOnInit() {
    this.orderService.getMyOrder().subscribe(res => {
      this.data = res.data.map(x => {
        return {
          _id: x._id,
          totalAmount: x.totalAmount,
          userid: x.userid,
          discount: x.discount,
          status: x.status
        };
      });

      console.log("data", this.data);
      console.log(typeof this.data);
      this.dataSource = new MatTableDataSource<OrderModel>(this.data);
    });
  }
}
