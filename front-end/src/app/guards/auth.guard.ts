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
export class AuthGuard implements CanActivate {
  constructor(private token: TokenService, private routes: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.token.decodedToken().isExpired && this.token.getToken()) {
      return true;
    } else {
      this.routes.navigate(["/login"]);
      return false;
    }
  }
}
