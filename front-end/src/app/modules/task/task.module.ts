import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { TaskComponent } from "src/app/components/task/task.component";
import { TasksComponent } from "src/app/components/tasks/tasks.component";

const routes: Routes = [
  { path: "", component: TaskComponent },
  { path: ":id", component: TasksComponent }
];
@NgModule({
  declarations: [TaskComponent, TasksComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskModule {}
