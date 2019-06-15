import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { TokenService } from "./services/token.service";
//import { VerifyEmailGuard } from "./guards/verify-email.guard";
import { LoginGuard } from "./guards/login.guard";
// import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    loadChildren: "./modules/auth/auth.module#AuthModule"
  },
  {
    path: "task",
    loadChildren: "./modules/task/task.module#TaskModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  providers: [AuthGuard, LoginGuard, TokenService],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
