import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialComponentsModule } from "./material-components.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// custom modules
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthCompleteComponent } from "./auth/authcomplete/authcomplete.component";

import { AuthCompleteService } from "./auth/authcomplete/authcomplete.service";
import { AuthAdminGuard } from "./_guards/auth.guard";
import { RegisterComponent } from "./auth/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthCompleteComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    HttpClientModule
  ],
  providers: [AuthCompleteService, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
