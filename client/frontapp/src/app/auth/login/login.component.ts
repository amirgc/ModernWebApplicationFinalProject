import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Loginmodel } from "./login.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginmodel = new Loginmodel();
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  login() {
    console.log("called")
    this.loginService.login(this.loginmodel);
  }
}
