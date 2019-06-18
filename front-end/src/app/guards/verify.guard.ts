import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { Router } from "@angular/router";
import { TokenService } from "../services/token.service";
@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private token: TokenService, private routes: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.token.getToken()) {
      this.routes.navigate(["/login"]);
      return false;
    }
    if (this.token.getToken() && this.token.decodedToken().isVerified) {
      this.routes.navigate(["/task/all"]);
      return false;
    }
    if (this.token.getToken() && !this.token.decodedToken().isVerified) {
      this.routes.navigate(["/verify"]);
      return false;
    }
    return true;
  }
}
