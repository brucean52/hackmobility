import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HereService {
  placeUrl = 'https://places.cit.api.here.com/places/v1/autosuggest';
  constructor(
    private http: HttpClient,
  ) {
  }
  getPlace(info: any) {
    return this.http.get(this.placeUrl +
      `?at=${info.lat},${info.lng}&q=${info.input}&app_id=en4UDxYiyY253xi8sHoX&app_code=RNuSjnohpcBhFIVrGzP8Kg`);
  }
}
