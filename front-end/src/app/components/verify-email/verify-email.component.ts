import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit {
  firstName;
  constructor(private token: TokenService) {}

  ngOnInit() {
    this.firstName = this.token.getuserName;
  }
}
