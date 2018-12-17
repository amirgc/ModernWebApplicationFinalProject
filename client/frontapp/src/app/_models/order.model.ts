export class OrderLine {
  LineId: string;
  OrderNo: string;
  DishId: string;
  TypeId: string;
  SizeId: string;
  Description: string;
  UoM: string;
  Qty: number;
  Rate: number;
  Amount: number;

  constructor() {
    this.LineId = "";
    this.OrderNo = "";
    this.DishId = "";
    this.TypeId = "";
    this.SizeId = "";
    this.Description = "";
    this.UoM = "";
    this.Qty = 1;
    this.Rate = 0;
    this.Amount = 0;
  }
}
