import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { MainComponent } from "./admin/main/main.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AuthAdminGuard } from "./_guards/auth.guard";
import { UsermainComponent } from "./user/usermain/usermain.component";
import { HomeComponent } from "./user/home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { MenumainComponent } from "./user/menumain/menumain.component";
import { OrderComponent } from "./admin/order/order.component";
import { OrderdetailsComponent } from "./admin/order/orderdetails/orderdetails.component";
import { DishesComponent } from "./admin/dishlist/dishes.component";
// import { DishComponent } from "./admin/dishlist/dish.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "admin",
    component: MainComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
        canActivate: [AuthAdminGuard]
      },
      {
        path: "orders",
        component: OrderComponent,
        pathMatch: "full",
        children: [
          {
            path: "ordersdetail",
            component: OrderdetailsComponent,
            pathMatch: "full"
          }
        ]
      },
      {
        path: "orders/:_id",
        component: OrderdetailsComponent,
        pathMatch: "full"
      },
      {
        path: "dishes",
        component: DishesComponent,
        pathMatch: "full",
        canActivate: [AuthAdminGuard]
      },
      {
        path: "dishes/create",
        component: DishesComponent,
        pathMatch: "full",
        canActivate: [AuthAdminGuard]
      }
    ]
  },
  {
    path: "",
    component: UsermainComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full"
      },
      {
        path: "menu",
        component: MenumainComponent,
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
