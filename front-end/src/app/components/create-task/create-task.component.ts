import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"]
})
export class CreateTaskComponent implements OnInit {
  constructor(private token: TokenService) {}

  ngOnInit() {}

  logout() {
    console.log("hjkds");
    this.token.deleteToken();
  }
}
