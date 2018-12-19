import { Component, OnInit, OnChanges, Inject, Input } from "@angular/core";
import { GlobalService } from "./../../_services/globale-variable.services";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { isEmpty } from "lodash";
import { MatSnackBar } from "@angular/material";

import { OrderLineModel } from "src/app/admin/order/orderLineModel";
import { State } from "./../../redux/order.state";
import * as OrderActions from "./../../redux/orders.actions";

import { AuthCompleteService } from "./../../auth/authcomplete/authcomplete.service";
import { Router } from "@angular/router";
import { OrderService } from "./order.service";
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

@Component({
  selector: "app-sidepanel",
  templateUrl: "./sidepanel.component.html",
  styleUrls: ["./sidepanel.component.scss"],
  animations: [
    trigger("showorderpanel", [
      state("true", style({ width: "100%" })),
      state("false", style({ width: "0%", display: "none" })),
      transition("* => *", animate("200ms linear"))
    ])
  ]
})
export class SidepanelComponent implements OnInit {
  tableHover: boolean;
  tableStriped: boolean;
  tableCondensed: boolean;
  tableBordered: boolean;
  orderLines: Observable<OrderLineModel[]>;

  /**variable declarations */
  netAmount = 0;
  taxableAmount = "0.00";
  deliveryCharge = "0.00";
  vatAmount = "0.00";
  grossAmount = "0.00";
  orderLinesData: OrderLineModel[];

  constructor(
    private globalService: GlobalService,
    private store: Store<State>,
    private authCompleteService: AuthCompleteService,
    private router: Router,
    private orderService: OrderService,
    public snackBar: MatSnackBar
  ) {
    this.orderLines = store.pipe(select("order"));
    this.orderLines.subscribe(data => {
      this.orderLinesData = data;
      this.netAmount = data.map(x => x.amount).reduce((a, b) => a + b, 0);
      this.refreshNewChanges();
    });
  }

  @Input("showSidePanel") showpanel: boolean;
  totalPrice: number;
  discounts: any;

  ngOnInit() {}

  refreshNewChanges() {
    const deliveryCharge_ = this.netAmount * 0.1;
    const vatAmount_ = (this.netAmount + deliveryCharge_) * 0.13;
    const grossAmount_ = this.netAmount + deliveryCharge_ + vatAmount_;

    this.taxableAmount = this.netAmount.toFixed(2);
    this.deliveryCharge = deliveryCharge_.toFixed(2);
    this.vatAmount = vatAmount_.toFixed(2);
    this.grossAmount = grossAmount_.toFixed(2);
  }

  goToCheckout() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser && currentUser.token;
    if (token) {
      this.authCompleteService.getUserInfo(token).subscribe(response => {
        console.log(response);
        if (response.email) {
          // Logic to post order to the service
          const orderDetails = {
            totalAmount: this.grossAmount,
            user: response,
            status: "Order Placed",
            orderline: this.orderLinesData
          };
          this.orderService.sendOrder(orderDetails).subscribe(data => {
            console.log(data);
            this.store.dispatch(new OrderActions.RemoveOrderAllLine());
            this.snackBar.open("Order Placed Successfully !!!", "Thank You", {
              duration: 2000
            });
          });
        } else {
          // This means token expire
          localStorage.clear();
          this.router.navigate(["/login"]);
        }
      });
    } else {
      // not logged in so redirect to login page
      this.router.navigate(["/login"]);
    }
  }

  removeItemFromCart(value) {
    this.store.dispatch(new OrderActions.RemoveOrderLine(value));
    this.orderLines.subscribe(res => {
      if (res.length === 0) {
        this.globalService.setShowHideOrderingList(false);
      }
    });
  }
}
