import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

import { AuthService } from "./services/auth.service";
import { TaskService } from "./services/task.service";
// import { AuthGuard } from './guards/auth.guard';
// import { CreateTaskComponent } from './components/create-task/create-task.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule
  ],
  providers: [AuthService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
