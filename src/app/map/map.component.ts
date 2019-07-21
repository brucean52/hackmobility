import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var H: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat: number;
  @Input() lng: number;

  private platform: any;
  private ui: any;
  private search: any;
  private map: any;
  private router: any;
  public directions: any;
  public query: string;

  public start: any;
  public finish: any;


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
    this.directions = [];
    this.router = this.platform.getRoutingService();
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
    this.route(this.start, this.finish);
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if ((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
  //     console.log('start', this.start);
  //     this.route(this.start, this.finish);
  //   }
  // }
  getDirections() {
    this.route(this.start, this.finish);
  }

  places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
      console.log('places data', data);
      for (let i = 0; i < data.results.items.length; i++) {
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
  route(start: any, finish: any) {
    let params = {
        "mode": "fastest;car",
        "waypoint0": "geo!" + this.start,
        "waypoint1": "geo!" + this.finish,
        "representation": "display"
    }
    this.map.removeObjects(this.map.getObjects());
    this.router.calculateRoute(params, data => {
        if(data.response) {
            this.directions = data.response.route[0].leg[0].maneuver;
            data = data.response.route[0];
            let lineString = new H.geo.LineString();
            data.shape.forEach(point => {
                let parts = point.split(",");
                lineString.pushLatLngAlt(parts[0], parts[1]);
            });
            let routeLine = new H.map.Polyline(lineString, {
                style: { strokeColor: "blue", lineWidth: 5 }
            });
            let startMarker = new H.map.Marker({
                lat: this.start.split(",")[0],
                lng: this.start.split(",")[1]
            });
            let finishMarker = new H.map.Marker({
                lat: this.finish.split(",")[0],
                lng: this.finish.split(",")[1]
            });
            this.map.addObjects([routeLine, startMarker, finishMarker]);
            this.map.setViewBounds(routeLine.getBounds());
        }
    }, error => {
        console.error(error);
    });
  }

  onKeyChange(event) {
    if (event.key === 'Enter') {
      this.places(this.query);
    }
  }

}
