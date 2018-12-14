import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../../environment/';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public token: string;
  public result: any = "";
  public httpRequestUrl: string = environment["WEB_API_URL"];
  private headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  constructor(private http: HttpClient) {}
  getUsers(reqObj): Observable<any> {
    const requesturl = "http://localhost:3002/v1/login";
    return this.http.post(requesturl, reqObj);
  }
}
