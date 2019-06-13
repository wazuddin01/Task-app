import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ForgotPasswordComponent } from "src/app/components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "src/app/components/verify-email/verify-email.component";

const routes: Routes = [
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "verify", component: VerifyEmailComponent }
];

@NgModule({
  declarations: [ForgotPasswordComponent, VerifyEmailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class AuthModule {}
