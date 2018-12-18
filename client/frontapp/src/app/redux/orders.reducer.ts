import * as OrderActions from "./orders.actions";
import { OrderLineModel } from "../admin/order/orderLineModel";

export function reducer(
  state: OrderLineModel[] = [],
  action: OrderActions.Actions
) {
  switch (action.type) {
    case OrderActions.ADD_ORDERLINE:
      if (state.length === 0) {
        state.push(action.payload);
        return state;
      } else {
        return [...state, action.payload];
      }
    case OrderActions.REMOVE_ORDERLINE:
      state.splice(action.payload, 1);
      return state;

    case OrderActions.REMOVE_ALL_ORDERLINE:
      state = [];
      return state;
    default:
      return state;
  }
}
