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
export class LoginGuard implements CanActivate {
  constructor(private token: TokenService, private routes: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token.getToken() && this.token.decodedToken().isVerified) {
      this.routes.navigate(["/task/all"]);
      return false;
    }
    return true;
  }
}
