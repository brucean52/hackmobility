import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HereService {
  placeUrl = 'https://places.cit.api.here.com/places/v1/autosuggest';
  apiString = 'app_id=en4UDxYiyY253xi8sHoX&app_code=RNuSjnohpcBhFIVrGzP8Kg';
  constructor(
    private http: HttpClient,
  ) {
  }
  getPlace(info: any) {
    return this.http.get<any>(this.placeUrl +
      `?at=${info.lat},${info.lng}&q=${info.input}&${this.apiString}`);
  }
  getAutoComplete(input: string) {
    const url = 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json';
    return this.http.get(url + `?${this.apiString} + &query=${input}+&beginHighlight=<b>&endHighlight=</b>`);
  }
}
