import { Component, OnInit } from '@angular/core';
import { MyoudersService } from '../myouders.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  myid;
  constructor(private myserve: MyoudersService, private route: ActivatedRoute, private router: Router) { }
  data;
  myData
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log("dasd");
      let id = params.get('_id');
      this.myid = id;
      console.log("PARAM ID - ", this.myid);
    })
    this.myserve.getMyOrder().subscribe(res => {
      res.data.map(x => {
        if (x._id == this.myid)
          this.myData = x;
      })
      console.log(this.myData);
    });
  }
}
