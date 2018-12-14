import { Observable } from "rxjs";
import { AuthCompleteService } from "./../auth/authcomplete/authcomplete.service";
import { Injectable, Inject } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authCompleteService: AuthCompleteService,
    @Inject("globals") public Globals
  ) {}

  canActivate(): Observable<boolean> | boolean {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser && currentUser.token;

    if (token) {
      this.authCompleteService.getUserInfo(token).subscribe(
        response => {
          if (response.Roles === "admin") {
            // This means already logged-in
            return true;
          } else {
            // This means token expire
            localStorage.clear();
            this.router.navigate(["/login"]);
            return false;
          }
        },
        err => {
          localStorage.clear();
          this.router.navigate(["/login"]);
          return false;
        }
      );
    } else {
      // not logged in so redirect to login page
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
