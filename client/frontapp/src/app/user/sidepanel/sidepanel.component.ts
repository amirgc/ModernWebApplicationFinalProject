import { Component, OnInit, OnChanges, Inject, Input } from "@angular/core";
import { GlobalService } from "./../../_services/globale-variable.services";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

import { isEmpty } from "lodash";
import { OrderLineModel } from "src/app/admin/order/orderLineModel";
import { State } from "./../../redux/order.state";
import * as OrderActions from "./../../redux/orders.actions";

import { AuthCompleteService } from "./../../auth/authcomplete/authcomplete.service";
import { Router } from "@angular/router";

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
  toggleCheckoutPlaceorderButton: boolean;
  netAmount = 0;
  taxableAmount = "0.00";
  deliveryCharge = "0.00";
  vatAmount = "0.00";
  grossAmount = "0.00";

  constructor(
    private globalService: GlobalService,
    private store: Store<State>,
    private authCompleteService: AuthCompleteService,
    private router: Router
  ) {
    this.orderLines = store.pipe(select("order"));
    this.orderLines.subscribe(data => {
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
    this.toggleCheckoutPlaceorderButton = true;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser && currentUser.token;
    if (token) {
      this.authCompleteService.getUserInfo(token).subscribe(response => {
        if (response.Email) {
          // This means already logged-in
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
