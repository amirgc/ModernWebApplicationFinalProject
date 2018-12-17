import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialComponentsModule } from "./material-components.module";

// custom modules
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthCompleteService } from "./auth/authcomplete/authcomplete.service";
import { AuthAdminGuard } from "./_guards/auth.guard";
import { RegisterComponent } from "./auth/register/register.component";
import { DishListService } from "./_services/dish-list.service";

// service

import { GlobalService } from "./_services/globale-variable.services";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    AdminModule
  ],
  providers: [
    AuthCompleteService,
    AuthAdminGuard,
    GlobalService,
    DishListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
