import { Component, OnInit } from "@angular/core";
import { GlobalService } from "./../../_services/globale-variable.services";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-usermain",
  templateUrl: "./usermain.component.html",
  styleUrls: ["./usermain.component.scss"]
})
export class UsermainComponent implements OnInit {
  showLoader: boolean;
  constructor(private globalService: GlobalService) {
    // subscribe the value of showLoader of global service show or hide
    // loader screen accordingly
    this.showLoader = true ;
    globalService.getShowLoaderValue$.subscribe(v => {
      console.log("globalService", v);
      this.showLoader = v;
    });
  }

  ngOnInit() {}
}
