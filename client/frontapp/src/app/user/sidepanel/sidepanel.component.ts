import { Component, OnInit, OnChanges, Inject, Input } from "@angular/core";
import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

import { isEmpty } from "lodash";

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
export class SidepanelComponent implements OnInit, OnChanges {
  tableHover: boolean;
  tableStriped: boolean;
  tableCondensed: boolean;
  tableBordered: boolean;

  /**variable declarations */
  toggleCheckoutPlaceorderButton: boolean;
  taxableAmount = "0.00";
  deliveryCharge = "0.00";
  vatAmount = "0.00";
  grossAmount = "0.00";
  totalItemInOrders = 0;

  constructor(@Inject("globals") public Globals) {}

  @Input("showSidePanel") showpanel: boolean;
  totalPrice: number;
  discounts: any;

  ngOnInit() {}

  ngOnChanges() {
    let discount = 0.0;
    if (!isEmpty(this.discounts)) {
      discount = this.discounts.reduce((a, b) => a + b.value, 0);
    }
    const deliveryCharge_ = (this.getTotalPrice_() - discount) * 0.1;
    const vatAmount_ =
      (this.getTotalPrice_() + deliveryCharge_ - discount) * 0.13;
    const grossAmount_ =
      this.getTotalPrice_() + deliveryCharge_ + vatAmount_ - discount;

    this.taxableAmount = this.getTotalPrice_().toFixed(2);
    this.deliveryCharge = deliveryCharge_.toFixed(2);
    this.vatAmount = vatAmount_.toFixed(2);
    this.grossAmount = grossAmount_.toFixed(2);
    this.totalItemInOrders = 12;
  }

  goToCheckout() {
    this.toggleCheckoutPlaceorderButton = true;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser && currentUser.token;
  }

  removeItemFromCart(value) {}

  getTotalPrice_(): number {
    return 100;
  }
}
