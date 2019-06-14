import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
// import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    loadChildren: "./modules/auth/auth.module#AuthModule",
    canActivate: [AuthGuard]
  },
  {
    path: "task",
    loadChildren: "./modules/task/task.module#TaskModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
