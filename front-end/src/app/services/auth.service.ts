import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class AuthService {
  private url = "http://localhost:3000/user";

  constructor(private http: HttpClient) {}

  login(credentials) {
    return this.http.post(`${this.url}/login`, credentials);
  }

  signup(credentials) {
    return this.http.post(`${this.url}/signup`, credentials);
  }

  clearCredentials(cred) {
    cred.email = "";
    cred.password = "";
    if (cred.firstName) {
      cred.firstName = "";
    }
    if (cred.lastName) {
      cred.lastName = "";
    }
  }
}
