import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UserService {
  loggedin = false;

  constructor(
    private http: HttpClient,
  ) {

  }

  login(username: string, password: string) {
      if (username === 'admin' && password === 'admin') {
          this.loggedin = true;
          return of(true);
      } else {
          return of(false);
      }
  }

  logout() {
      this.loggedin = false;
      return of(true);
  }

  isUserLoggedin() {
      return this.loggedin;
  }

}
