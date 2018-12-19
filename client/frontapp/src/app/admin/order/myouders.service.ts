import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MyoudersService {
  public httpRequestUrl: string = environment["WEB_API_URL"];
  constructor(public http: HttpClient) {}

  getMyOrder(): Observable<any> {
    return this.http.get(this.httpRequestUrl + "orders/");
  }
  getOrderDetailsById(id): Observable<any> {
    return this.http.get(this.httpRequestUrl + "orders/" + id);
  }
}
