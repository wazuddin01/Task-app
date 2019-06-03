import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  submit(form) {
    console.log(form.value);
    this.auth.signup(form.value).subscribe(
      succ => {
        console.log(succ);
      },
      err => {
        console.log(err);
      }
    );
  }
}
