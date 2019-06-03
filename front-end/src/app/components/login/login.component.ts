import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  errors;
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  submit(form) {
    console.log(form.value);
    this.auth.login(form.value).subscribe(
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
