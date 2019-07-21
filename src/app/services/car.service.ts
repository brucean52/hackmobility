import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CarService {
    BASE_ENDPOINT = "/api/cars";

    constructor(private http: HttpClient) { }

    getCarByOwner(ownerId: string) {
        return this.http.get(`${this.BASE_ENDPOINT}/owner/${ownerId}`);
    }

    addCarToOwner(carInfo) {
        return this.http.post(`${this.BASE_ENDPOINT}`, carInfo);
    }

    getSmartCarOAuthURL() {
        return this.http.get(`${this.BASE_ENDPOINT}/smart_car_url`);
    }
}