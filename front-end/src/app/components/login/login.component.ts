import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
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
  constructor(private auth: AuthService) {}
  ngOnInit() {}
  logingIn() {
    console.log();
    this.auth.login(this.credentials).subscribe(
      succ => {
        this.auth.clearCredentials(this.credentials);
      },
      err => {
        this.error = err.error;
        this.auth.clearCredentials(this.credentials);
      }
    );
  }
  clearCredentials(cred) {
    cred.email = "";
    cred.firstName = "";
    cred.lastName = "";
    cred.password = "";
  }
}
