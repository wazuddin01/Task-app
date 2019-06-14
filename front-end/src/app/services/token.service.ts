import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class TokenService {
  constructor() {}
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
    const decodedToken = helper.decodeToken(this.getToken());
    // const expirationDate = helper.getTokenExpirationDate(this.getToken());
    const isExpired = helper.isTokenExpired(this.getToken());
    // console.log("Date.now",new Date);
    // console.log("Date", expirationDate);
    console.log("decodedToken", decodedToken);
    console.log("token", this.getToken());
    return { decodedToken, isExpired };
  }
  deleteToken() {
    return localStorage.removeItem("token");
  }
}
