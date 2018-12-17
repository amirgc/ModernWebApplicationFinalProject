import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Loginmodel } from "../auth/login/login.model";

export const LOGIN_USER = "LOGIN";
export const LOGOUT_USER = "LOGOUT";

export class Login implements Action {
  readonly type = LOGIN_USER;

  constructor(public payload: Loginmodel) {}
}

export class Logout implements Action {
  readonly type = LOGOUT_USER;

  constructor(public payload: number) {}
}

export type Actions = Login | Logout;
