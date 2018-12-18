export class OrderLineModel {
    _id: String;
    amount: number;
    dish: String;
    qty: number;
    rate: number;
    size: String;
    type: String;
    uom: String;
    constructor(
      amount: number,
      dish: String,
      qty: number,
      rate: number,
      size: String,
      type: String,
      uom: String
    ) {
      this.amount = amount;
      this.dish = dish;
      this.qty = qty;
      this.rate = rate;
      this.size = size;
      this.type = type;
      this.uom = uom;
    }
  }