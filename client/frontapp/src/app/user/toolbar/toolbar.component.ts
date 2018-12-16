import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  isBtnActive: boolean;
  constructor() {
    //this.isBtnActive = true;
  }

  ngOnInit() {}

  toggleMenu() {
    this.isBtnActive = !this.isBtnActive;
  }
}
