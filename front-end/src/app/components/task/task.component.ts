import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  length = [1, 2, 3, 45, 56];
  constructor() {}

  ngOnInit() {}
}
