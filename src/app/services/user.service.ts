import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class UserService {
  authenticated = false;
  BASE_ENDPOINT = "/api/user";
  userInfo = {};

  constructor(
    private http: HttpClient,
  ) {

  }

  login(username: string, password: string) {
      return this.http.post(`${this.BASE_ENDPOINT}/login`, {
          username, password
      }).pipe(
          tap((login: any) => {
            if (login && login.isAuthenticated) {
                this.authenticated = true;
                this.userInfo = login;
            }
          })
      );
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

  getCurrentUserInfo() {
    return this.userInfo;
  }

  register(user) {
      return this.http.post(`${this.BASE_ENDPOINT}/new`, user);

  }

  postRoute(routeObject: any) {
    const postBody = {
      driverId: routeObject.driverId,
      startAddress: routeObject.startObj.address,
      startLat: routeObject.startObj.lat,
      startLng: routeObject.startObj.lng,
      finishAddress: routeObject.finishObj.address,
      finishLat: routeObject.finishObj.lat,
      finishLng: routeObject.finishObj.lng
    };

    return this.http.post(`${this.BASE_ENDPOINT}/addroute`, postBody);
}

}
