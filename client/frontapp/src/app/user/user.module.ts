import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsermainComponent } from "./usermain/usermain.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [UsermainComponent, HomeComponent],
  imports: [CommonModule, RouterModule]
})
export class UserModule {}
