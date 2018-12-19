import { Injectable } from "@angular/core";
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
    return this.http.get("http://localhost:3002/v1/dishes", {
      headers: this.headers
    });
  }

  createDish(dish): Observable<any> {
    const ff = {
      image:
        "https://www.recipesaresimple.com/wp-content/uploads/2018/09/easy-kerala-chicken-fry-1000x500.jpg",
      name: "fdfd",
      description: "dffds",
      orderingPosition: "fdffdffdfd",
      uom: "fdf",
      types: [{ name: "dfdf", sizes: [{ name: "fdfd", price: 0 }] }]
    };
    console.log("starting log - createDish", dish);
    return this.http.post("http://localhost:3002/v1/dishes/create", dish, {
      headers: this.headers
    });
  }

  updateDish(dish): Observable<any> {
    console.log("starting log - updateDish");
    console.log(dish);
    return this.http.post("http://localhost:3002/v1/dishes/update", dish, {
      headers: this.headers
    });
  }

  deleteDish(dish): Observable<any> {
    console.log("starting log - deleteDish");
    console.log(dish);
    return this.http.post("http://localhost:3002/v1/dishes/delete", dish, {
      headers: this.headers
    });
  }
}
