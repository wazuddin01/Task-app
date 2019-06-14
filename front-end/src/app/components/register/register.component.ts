import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  credentials = {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  };
  error = {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  };
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}

  registerUser() {
    this.auth.signup(this.credentials).subscribe(
      succ => {
        console.log(succ);
        this.route.navigate(["/verify"]);
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
