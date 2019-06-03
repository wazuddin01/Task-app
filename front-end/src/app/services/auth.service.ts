import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "http://localhost:3000/user";
  
  constructor(private http: HttpClient) {}

  login(credentials) {
    return this.http.post(`${this.url}/login`, credentials);
  }

  signup(credentials) {
    return this.http.post(`${this.url}/signup`, credentials);
  }
}
