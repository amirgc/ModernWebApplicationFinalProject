// import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthCompleteService {
  public token: string;
  public httpRequestUrl: string = environment["WEB_API_URL"];

  isAuthenticated = false;

  constructor(private http: HttpClient) {}

  getUserInfo(acesstoken: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    ); // add a new header, creating a new object
    headers = headers.append("x-access-token", acesstoken); // add a new header, creating a new object

    console.log("getUserInfo", acesstoken);
    return this.http.get(this.httpRequestUrl + "verifyToken", {
      headers: headers
    });
  }
}
