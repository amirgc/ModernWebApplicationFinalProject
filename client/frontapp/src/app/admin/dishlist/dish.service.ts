import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DishService {

  public httpRequestUrl: string = environment["WEB_API_URL"];
  headers = new HttpHeaders({ "Content-Type": "application/json" });
  public response: any = "";

  constructor(private http: HttpClient) {}

  getDishList(): Observable<any> {
    return this.http.get(
      "http://localhost:3002/v1/dishes",
      { headers: this.headers }
    );
  }

  createDish(): Observable<any> {
    console.log(this.http.request);
    return this.http.post('http://localhost:3002/v1/dishes/create', 
    {headers: this.headers});
  }
}
