import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Loginmodel } from "./login.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  public token: string;
  public result: any = "";
  public httpRequestUrl: string = environment["WEB_API_URL"];
  private headers = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  constructor(private http: HttpClient) {}
  login(loginModel: Loginmodel): Observable<any> {
    const logindata =
      "grant_type=password&email=" +
      loginModel.email +
      "&password=" +
      loginModel.password;
    console.log("url", this.httpRequestUrl);
    return this.http.post(this.httpRequestUrl + "login", logindata, {
      headers: this.headers
 });
  }
}
