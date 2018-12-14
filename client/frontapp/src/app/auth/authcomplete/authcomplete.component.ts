import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthCompleteService } from "./authcomplete.service";

@Component({
  selector: "app-auth-complete",
  templateUrl: "./authcomplete.html",
  providers: [AuthCompleteService]
})
export class AuthCompleteComponent implements OnInit {
  // This component will be called when we have no any routing point to go;
  // On Facebook, Google authentication it routes on different URL and hence hits this constructor
  constructor(
    private router: Router,
    private authCompleteService: AuthCompleteService,
    @Inject("globals") public Globals
  ) {
    if (localStorage.getItem("currentUser")) {
      this.authCompleteService
        .getUserInfo(JSON.parse(localStorage.getItem("currentUser")).token)
        .subscribe(
          response => {
            if (response.Email) {
              this.redirectLogin("");
            } else {
              // Not verified
              localStorage.clear();
              this.redirectLogin("");
            }
          },
          error => {
            // Token expire
            localStorage.clear();
            this.redirectLogin("");
          }
        );
    } else {
      let authorizationCode;
      if (window.location.hash.indexOf("#") === 0) {
        authorizationCode = this.parseQueryString(
          window.location.hash.substr(1)
        );
      } else {
        authorizationCode = "";
      }
      if (authorizationCode.access_token) {
        this.authCompleteService
          .getUserInfo(authorizationCode.access_token)
          .subscribe(
            response => {
              if (response.HasRegistered === false && response.Email === null) {
                this.router.navigate(["customerror/101"]);
              } else if (response.HasRegistered === false) {
                localStorage.removeItem("thirdpartytoken");
                localStorage.setItem(
                  "thirdpartytoken",
                  authorizationCode.access_token
                );
                this.router.navigate(["/externalregister"]);
              } else if (response.HasRegistered === true) {
                this.authCompleteService
                  .getAccessToken(authorizationCode.access_token)
                  .subscribe(response_ => {
                    localStorage.removeItem("currentUser");
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify({
                        firstName: response.FirstName,
                        token: authorizationCode.access_token,
                        role: response.Roles,
                        userName: response.UserName,
                        email: response.Email,
                        id: response.Id
                      })
                    );

                    /** syncing data to server */
                    this.Globals.syncOrderWithServer(true);
                    this.Globals.syncWithServer$.subscribe(
                      orderLineList => {
                        this.Globals.setUserName(response.UserName);
                        this.redirectLogin("");
                      },
                      error => {
                        // Syncing error
                        localStorage.clear();
                      }
                    );
                  });
              } else {
                localStorage.removeItem("currentUser");
                this.redirectLogin("");
              }
            },
            error => {
              // TODO: notification for failure

              localStorage.clear();
              this.redirectLogin("");
            }
          );
      } else {
        localStorage.clear();
        this.redirectLogin("");
      }
    }
  }

  ngOnInit() {}

  redirectLogin(redirect) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = currentUser && currentUser.role;
    if (userRole === "admin") {
      this.router.navigate(["/admin"]);
    } else {
      this.router.navigate(["/menu"]);
    }
  }

  parseQueryString(queryString) {
    let data = {},
      pairs = "",
      pair = "",
      separatorIndex = 1,
      escapedKey = "",
      escapedValue = "",
      key = "",
      value = "";

    if (queryString === null) {
      data = {};
      return data;
    }

    pairs = queryString.split("&");

    for (let i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      separatorIndex = pair.indexOf("=");

      if (separatorIndex === -1) {
        escapedKey = pair;
        escapedValue = null;
      } else {
        escapedKey = pair.substr(0, separatorIndex);
        escapedValue = pair.substr(separatorIndex + 1);
      }

      key = decodeURIComponent(escapedKey);
      value = decodeURIComponent(escapedValue);

      data[key] = value;
    }

    return data;
  }
}
// if (this.authorizationCode) {
//     this.authorizationCode = this.authorizationCode.replace('%2F', '/');
//     window.history.replaceState({}, document.title, window.location.href.replace(window.location.search, ''));
// }
