import { Action } from "@ngrx/store";
import { OrderLineModel } from "../admin/order/orderLineModel";

export const ADD_ORDERLINE = "ADD";
export const REMOVE_ORDERLINE = "REMOVE";
export const TOTAL_AMOUNT = "TOTAL";
export class AddOrderLine implements Action {
  readonly type = ADD_ORDERLINE;

  constructor(public payload: OrderLineModel) {}
}

export class RemoveOrderLine implements Action {
  readonly type = REMOVE_ORDERLINE;

  constructor(public payload: number) {}
}

export class TotalAmount implements Action {
  readonly type = TOTAL_AMOUNT;

  constructor() {}
}

export type Actions = AddOrderLine | RemoveOrderLine;
