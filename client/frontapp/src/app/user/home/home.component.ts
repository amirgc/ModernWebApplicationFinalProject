import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/_services/globale-variable.services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private globalService: GlobalService) {
    this.globalService.setShowLoader(false);
  }

  ngOnInit() {}
}
