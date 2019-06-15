import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  length = [1, 2, 3, 45, 56];
  constructor(private token: TokenService, private route: Router) {}

  ngOnInit() {}
  logout() {
    this.token.deleteToken();
    this.route.navigate(["/login"]);
  }
}
