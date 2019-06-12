import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
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
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  registerUser(credentials) {
    // console.log("Email", this.credentials);
    // console.log(form.value);
    this.auth.signup(this.credentials).subscribe(
      succ => {
        console.log(succ);
        this.clearCredentials(this.credentials);
      },
      err => {
        console.log(err.error);
        this.clearCredentials(this.credentials);
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
