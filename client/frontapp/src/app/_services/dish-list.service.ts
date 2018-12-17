import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DishListService {
  public httpRequestUrl: string = environment["WEB_API_URL"];
  headers = new HttpHeaders({ "Content-Type": "application/json" });
  public response: any = "";

  constructor(private http: HttpClient) {}

  getDishList(): Observable<any> {
    return this.http.get(
      "https://api.tsfoodland.com//api/Dish/CreateDishList",
      { headers: this.headers }
    );
  }
}
