import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { GlobalService } from "./../../_services/globale-variable.services";

@Component({
  selector: "app-menumain",
  templateUrl: "./menumain.component.html",
  styleUrls: ["./menumain.component.scss"]
})
export class MenumainComponent implements OnInit {
  showSidePanel: boolean;
  constructor(private globalService: GlobalService) {
    globalService.getShowHideOrderingList$.subscribe(v => {
      this.showSidePanel = v;
    });
  }

  ngOnInit() {}
}
