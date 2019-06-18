import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable()
export class TokenService {
  private helper = new JwtHelperService();
  constructor(private route: Router) {}

  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  decodedToken() {
    // let isVerified = true;
    if (this.getToken()) {
      const isExpired = this.helper.isTokenExpired(this.getToken());
      const { isVerified } = this.helper.decodeToken(this.getToken());
      // console.log(this.helper.decodeToken(this.getToken()));
      // console.log("isVerified", isVerified);
      
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
  getuserName() {
    console.log(this.helper.decodeToken(this.getToken()));
    //  return firstName;
  }
  deleteToken() {
    localStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }
}
