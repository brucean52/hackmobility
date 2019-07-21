import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HereService } from '../services/here.service';

declare var H: any;

@Component({
  selector: 'app-car',
  templateUrl: './carshare.component.html',
  styleUrls: ['./carshare.component.scss']
})
export class CarShareComponent implements OnInit, AfterViewInit {
  private platform: any;
  public lat = 37.7903751;
  public lng = -122.4000921;
  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor() {
      this.platform = new H.service.Platform({
        "app_id": "en4UDxYiyY253xi8sHoX",
        "app_code": "RNuSjnohpcBhFIVrGzP8Kg"
      });
  }

  ngOnInit(): void {
    // console.log('init', navigator);
    // Not Working
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('position', position);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
    });
   }
  }

  public ngAfterViewInit() {
      let defaultLayers = this.platform.createDefaultLayers();
      let map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.normal.map,
          {
              zoom: 10,
              center: { lat: this.lat, lng: this.lng }
          }
      );
  }
}
