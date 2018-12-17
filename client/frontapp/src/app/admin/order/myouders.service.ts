import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MyoudersService {

  constructor(public http: HttpClient) { }

  getMyOrder(){
    return this.http.get("http://localhost:3002/v1/orders/");
  }
}
