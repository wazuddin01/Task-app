import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";
// import { Clear } from "../../../assets/functions/clear";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials = {
    email: "",
    password: ""
  };
  error = {
    email: "",
    password: ""
  };
  constructor(
    private auth: AuthService,
    private route: Router,
    private token: TokenService
  ) {}
  ngOnInit() {}

  logingIn() {
    this.auth.login(this.credentials).subscribe(
      succ => {
        console.log(succ);
        this.token.setToken(succ["data"].token);
        this.route.navigate(["/task/all"]);
        this.auth.clearCredentials(this.credentials);
      },
      err => {
        console.log(err.error);
        this.error = err.error;
        // this.auth.clearCredentials(this.credentials);
      }
    );
  }
}
