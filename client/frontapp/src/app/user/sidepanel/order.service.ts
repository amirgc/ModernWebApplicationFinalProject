import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class OrderService {
  public httpRequestUrl: string = environment["WEB_API_URL"];
  headers = new HttpHeaders({ "Content-Type": "application/json" });
  public response: any = "";

  constructor(private http: HttpClient) {}

  sendOrder(orderDetails): Observable<any> {
    console.log(orderDetails);
    return this.http.post(this.httpRequestUrl + "orders", orderDetails, {
      headers: this.headers
    });
  }
}
