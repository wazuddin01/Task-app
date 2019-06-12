import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

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
  errors;
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  logingIn(credentials) {
    console.log();
    this.auth.login(this.credentials).subscribe(
      succ => {
        console.log(succ);
      },
      err => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }
}
