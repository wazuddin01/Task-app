import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  length = [1, 2, 3, 45, 56];
  constructor(private token: TokenService) {}

  ngOnInit() {}
  logout() {
    this.token.deleteToken();
  }
}
