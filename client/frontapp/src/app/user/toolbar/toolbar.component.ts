import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean;
  isBtnActive: boolean;
  user: string;
  constructor() {
    //this.isBtnActive = true;
  }

  ngOnInit() {
    const usr = JSON.parse(localStorage.getItem("user"));
    console.log(usr);
    this.user = usr.name;
    if (this.user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  toggleMenu() {
    this.isBtnActive = !this.isBtnActive;
  }
  logOut() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
