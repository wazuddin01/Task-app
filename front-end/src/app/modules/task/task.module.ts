import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { TaskComponent } from "src/app/components/task/task.component";
import { TasksComponent } from "src/app/components/tasks/tasks.component";
import { CreateTaskComponent } from "src/app/components/create-task/create-task.component";

const routes: Routes = [
  { path: "all", component: TaskComponent },
  { path: "create", component: CreateTaskComponent },
  { path: ":id", component: TasksComponent }
];
@NgModule({
  declarations: [TaskComponent, TasksComponent, CreateTaskComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskModule {}
