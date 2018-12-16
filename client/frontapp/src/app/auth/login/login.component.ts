import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Loginmodel } from "./login.model";
import { Router } from "@angular/router";

import { AuthCompleteService } from "./../authcomplete/authcomplete.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginmodel = new Loginmodel();
  errormessage = "";
  loading = false;
  constructor(
    private loginService: LoginService,
    private authCompleteService: AuthCompleteService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.loginService.login(this.loginmodel).subscribe(data => {
      if (data.auth) {
        this.loading = true;
        // get user info
        this.authCompleteService.getUserInfo(data.token).subscribe(
          response => {
            localStorage.setItem("currentUser", JSON.stringify(data));
            console.log("authCompleteService", response);
            if (response.role === "admin") {
              this.router.navigate(["/admin"]);
            } else if (response.role === "user") {
              this.router.navigate(["/"]);
            }
            this.loading = false;
          },
          err => {
            localStorage.clear();
            this.router.navigate(["/login"]);
            return false;
          }
        );
      } else {
        this.errormessage =
          "User name Or Password is incorrect. Please try again !!!";
      }
    });
  }
}
