import { Component, OnInit } from '@angular/core';
import { HereService } from '../services/here.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  searchInput: string = '';
  public lat = 37.7903751;
  public lng = -122.4000921;

  constructor(
    private hereService: HereService,
   ) { }

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

  onKeyChange(event) {
    if (event.key === 'Enter') {
      console.log('search', this.searchInput);
      const info = {
        input: this.searchInput,
        lat: this.lat,
        lng: this.lng
      }
      this.hereService.getPlace(info).subscribe(resp => {
        console.log('here response', resp);
      });
    }
  }
}
