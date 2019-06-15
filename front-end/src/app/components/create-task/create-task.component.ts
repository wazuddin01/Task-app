import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"]
})
export class CreateTaskComponent implements OnInit {
  constructor(private token: TokenService, private route: Router) {}

  ngOnInit() {}

  logout() {
    console.log("hjkds");
    this.token.deleteToken();
    this.route.navigate(["/login"]);
  }
}
