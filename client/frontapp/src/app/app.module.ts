import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// custom modules
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthCompleteComponent } from "./auth/authcomplete/authcomplete.component";

import { AuthCompleteService } from "./auth/authcomplete/authcomplete.service";
import { AuthAdminGuard } from "./_guards/auth.guard";
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AuthCompleteComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, UserModule, AdminModule],
  providers: [AuthCompleteService, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
