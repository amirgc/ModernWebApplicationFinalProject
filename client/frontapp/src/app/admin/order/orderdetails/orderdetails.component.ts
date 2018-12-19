import { Component, OnInit, Inject } from "@angular/core";
import { MyoudersService } from "../myouders.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.component.html",
  styleUrls: ["./orderdetails.component.scss"]
})
export class OrderdetailsComponent implements OnInit {
  myid: string;
  data1;
  myData;
  constructor(
    private myserve: MyoudersService,
    public dialogRef: MatDialogRef<OrderdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myid = data.id;
    console.log(this.myid);
    this.myserve.getOrderDetailsById(this.myid).subscribe(res => {
      this.myData = res[0];
      console.log(this.myData);
    });
  }

  ngOnInit() {}
}
