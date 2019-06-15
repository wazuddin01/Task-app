import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable()
export class TokenService {
  constructor(private route: Router) {}
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
    //     console.log("decodedToken", decodedToken);
    //     console.log("expirationDate", expirationDate);
    //     console.log("isExpired", isExpired);
  }
  decodedToken() {
    const helper = new JwtHelperService();
    // let isVerified = true;
    if (this.getToken()) {
      const isExpired = helper.isTokenExpired(this.getToken());
      const { isVerified } = helper.decodeToken(this.getToken());
      return { isExpired, isVerified };
    }
    // const { isVerified } = helper.decodeToken(this.getToken());
    // const expirationDate = helper.getTokenExpirationDate(this.getToken());

    // console.log("Date.now",new Date);
    // console.log("Date", expirationDate);
    // console.log("decodedToken", isVerified);
    // console.log("token", this.getToken());
    return { isExpired: true, isVerified: false };
  }
  deleteToken() {
    localStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }
}
