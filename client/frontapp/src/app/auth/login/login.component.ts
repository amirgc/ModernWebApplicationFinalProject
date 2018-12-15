import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Loginmodel } from "./login.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginmodel = new Loginmodel();
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login() {
    console.log("called");
    this.loginService.login(this.loginmodel).subscribe(data => {
      if (data.auth) {
        localStorage.setItem("currentUser", JSON.stringify(data);
        this.router.navigate(["/admin"]);
        console.log(data, typeof data.auth);
      } else {
      }
    });
  }
}
