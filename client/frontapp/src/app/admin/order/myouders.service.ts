import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MyoudersService {
  constructor(public http: HttpClient) {}

  getMyOrder(): Observable<any> {
    return this.http.get("http://localhost:3002/v1/orders/");
  }
}
