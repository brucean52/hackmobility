import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UserService {
  authenticated = false;

  constructor(
    private http: HttpClient,
  ) {

  }

  login(username: string, password: string) {
      if (username === 'admin' && password === 'admin') {
          this.authenticated = true;
          return of(true);
      } else {
          return of(false);
      }
  }

  logout() {
      this.authenticated = false;
      return of(true);
  }

  isUserAuthenticated() {
      return this.authenticated;
  }

}