import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UserService {
  authenticated = false;
  BASE_ENDPOINT = "/api/user";

  constructor(
    private http: HttpClient,
  ) {

  }

  login(username: string, password: string) {
      return this.http.post(`${this.BASE_ENDPOINT}/login`, {
          username, password
      });
  }

  logout() {
      this.authenticated = false;
      return of(true);
  }

  isUserAuthenticated() {
      return this.authenticated;
  }

  setUserAuthenticated(auth: boolean) {
      this.authenticated = auth;
  } 

  register(user) {
      return this.http.post(`${this.BASE_ENDPOINT}/new`, user);

  }

}
