import { Action } from "@ngrx/store";
import { Loginmodel } from "../auth/login/login.model";
import * as LoginActions from "./orders.actions";

const initialState: Loginmodel = {
  email: "",
  password: ""
};

export function reducer(
  state: Loginmodel = initialState,
  action: LoginActions.Actions
) {
  switch (action.type) {
    case LoginActions.LOGIN_USER:
      return true;

    case LoginActions.LOGOUT_USER:
      // state.splice(action.payload, 1);
      return false;
    default:
      return state;
  }
}
