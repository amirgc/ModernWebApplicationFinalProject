// import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthCompleteService {
  public token: string;
  public result: any = { errormessage: "" };
  public response: any = "";
  public httpRequestUrl: string = environment["WEB_API_URL"];
  private headers = new Headers({ "Content-Type": "application/json" });
  isAuthenticated = false;

  constructor(private http: Http) {}

  // api/Account/Register
  getUserInfo(acesstooken: string): Observable<any> {
    this.headers.set("authorization", "bearer " + acesstooken);
    return this.http.get(this.httpRequestUrl + "api/Account/UserInfo", {
      headers: this.headers
    });
  }

  getAccessToken(acesstooken: string): Observable<any> {
    this.headers.set("authorization", "bearer " + acesstooken);
    return this.http.post(
      this.httpRequestUrl + "api/Account/ObtainLocalAccessToken",
      "",
      {
        headers: this.headers
      }
    );
  }

  private extractData(response: Response) {
    this.isAuthenticated = true;
    this.response = response.json();
    const body = this.response;
    return body || {};
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  private handleLoginError(error: Response) {
    this.isAuthenticated = false;
    return Observable.throw(error);
  }
}
