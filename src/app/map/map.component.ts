import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

declare var H: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

    private platform: any;
    private ui: any;
    private search: any;
    private map: any;
    public query: string;
    @Input() lat: number;
    @Input() lng: number;

    @ViewChild("map")
    public mapElement: ElementRef;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "en4UDxYiyY253xi8sHoX",
            "app_code": "RNuSjnohpcBhFIVrGzP8Kg"
        });
    }

    ngOnInit() { 
      this.search = new H.places.Search(this.platform.getPlacesService());
    }

    ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: this.lat, lng: this.lng }
            }
        );
        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    }
    places(query: string) {
      this.map.removeObjects(this.map.getObjects());
      this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
        console.log('places data', data);
          for(let i = 0; i < data.results.items.length; i++) {
              this.dropMarker({ "lat": data.results.items[i].position[0], "lng": data.results.items[i].position[1] }, data.results.items[i]);
          }
      }, error => {
          console.error(error);
      });
  }

    dropMarker(coordinates: any, data: any) {
      let marker = new H.map.Marker(coordinates);
      marker.setData("<p>" + data.title + "<br>" + data.vicinity + "</p>");
      marker.addEventListener('tap', event => {
          let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
              content: event.target.getData()
          });
          this.ui.addBubble(bubble);
      }, false);
      this.map.addObject(marker);
  }
    onKeyChange(event) {
    if (event.key === 'Enter') {
      this.places(this.query);
    }
  }

}
