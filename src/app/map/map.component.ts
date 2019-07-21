import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HereService } from '../services/here.service';
import { UserService } from '../services/user.service';
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
  public geocoder: any;
  public date = '';
  public time = '';

  public startPlaces = [];
  public finishPlaces = [];
  startObj = {
    address: '',
    lat: null,
    lng: null
  };
  finishObj = {
    address: '',
    lat: null,
    lng: null
  };

  timeArray = [
    {
      view: "12:00 AM",
      value: "0000"
    },
    {
      view: "12:30 AM",
      value: "0030"
    },
    {
      view: "1:00 AM",
      value: "0100"
    },
    {
      view: "1:30 AM",
      value: "0130"
    },
    {
      view: "2:00 AM",
      value: "0200"
    },
    {
      view: "2:30 AM",
      value: "0230"
    },
    {
      view: "3:00 AM",
      value: "0300"
    },
    {
      view: "3:30 AM",
      value: "0330"
    },
    {
      view: "4:00 AM",
      value: "0400"
    },
    {
      view: "4:30 AM",
      value: "0430"
    },
    {
      view: "5:00 AM",
      value: "0500"
    },
    {
      view: "5:30 AM",
      value: "0530"
    },
    {
      view: "6:00 AM",
      value: "0600"
    },
    {
      view: "6:30 AM",
      value: "0630"
    },
    {
      view: "7:00 AM",
      value: "0700"
    },
    {
      view: "7:30 AM",
      value: "0730"
    },
    {
      view: "8:00 AM",
      value: "0800"
    },
    {
      view: "8:30 AM"
    },
    {
      view: "9:00 AM"
    },
    {
      view: "9:30 AM"
    },
    {
      view: "10:00 AM"
    },
    {
      view: "10:30 AM"
    },
    {
      view: "11:00 AM"
    },
    {
      view: "11:30 AM"
    },
    {
      view: "12:00 PM"
    },
    {
      view: "12:30 PM"
    },
    {
      view: "1:00 PM"
    },
    {
      view: "1:30 PM"
    },
    {
      view: "2:00 PM"
    },
    {
      view: "2:30 PM"
    },
    {
      view: "3:00 PM"
    },
    {
      view: "3:30 PM"
    },
    {
      view: "4:00 PM"
    },
    {
      view: "4:30 PM"
    },
    {
      view: "5:00 PM"
    },
    {
      view: "5:30 PM"
    },
    {
      view: "6:00 PM"
    },
    {
      view: "6:30 PM"
    },
    {
      view: "7:00 PM"
    },
    {
      view: "7:30 PM"
    },
    {
      view: "8:00 PM"
    },
    {
      view: "8:30 PM"
    },
    {
      view: "9:00 PM"
    },
    {
      view: "9:30 PM"
    },
    {
      view: "10:00 PM"
    },
    {
      view: "10:30 PM"
    },
    {
      view: "11:00 PM"
    },
    {
      view: "11:30 PM"
    }
  ];
  userCreatedRides = [];

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor(
    private hereService: HereService,
    private userService: UserService
  ) {
    this.platform = new H.service.Platform({
        "app_id": "en4UDxYiyY253xi8sHoX",
        "app_code": "RNuSjnohpcBhFIVrGzP8Kg"
    });
  }

  ngOnInit() { 
    this.search = new H.places.Search(this.platform.getPlacesService());
    this.directions = [];
    this.router = this.platform.getRoutingService();
    // this.geocoder = this.platform.getGeocodingService();
    const userInfo = this.userService.getCurrentUserInfo();
    this.userService.getRoutesByDriverId(userInfo.id).subscribe( resp => {
      console.log('user created routes', resp);
      this.userCreatedRides = resp;
    });
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

  getDirections() {
    this.route(this.startObj, this.finishObj);
  }

  getGeocoding(text: string) {
    console.log('text', text);
    const geocodingParams = {
      searchText: text  
    };
    this.geocoder.geocode(geocodingParams,
      result => {
      console.log('result', result);
    },
    error => {
      console.log('error', error);
    });
  }

  getStartPlaces(text: string) {
    const info = {
      input: text,
      lat: this.lat,
      lng: this.lng
    };
    this.hereService.getPlace(info).subscribe( resp => {
      console.log('get Places', resp);
      this.startPlaces = [];
      resp.results.map(item => {
        this.startPlaces.push(item);
      });
    });
    this.places(text);
  }

  getFinishPlaces(text: string) {
    const info = {
      input: text,
      lat: this.lat,
      lng: this.lng
    };
    this.hereService.getPlace(info).subscribe( resp => {
      console.log('get finish Places', resp);
      this.finishPlaces = [];
      resp.results.map(item => {
        this.finishPlaces.push(item);
      });
    });
    this.places(text);
  }
  selectRide(ride: any) {
    this.route(ride.startObj, ride.finishObj);
  }

  setStartPlace(place: any) {
    const plainText = place.vicinity.replace(/<[^>]*>/g, '');
    this.startObj = {
      address: plainText,
      lat: place.position[0],
      lng: place.position[1]
    };
    this.startPlaces = [];
  }
  setFinishPlace(place: any) {
    const plainText = place.vicinity.replace(/<[^>]*>/g, '');
    this.finishObj = {
      address: plainText,
      lat: place.position[0],
      lng: place.position[1]
    };
    this.finishPlaces = [];
    this.getDirections();
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
  route(startObj: any, finishObj: any) {
    let startArr = [startObj.lat, startObj.lng];
    let finishArr = [finishObj.lat, finishObj.lng];
    let params = {
        "mode": "fastest;car",
        "waypoint0": "geo!" + startArr,
        "waypoint1": "geo!" + finishArr,
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
                lat: startObj.lat,
                lng: startObj.lng
            });
            let finishMarker = new H.map.Marker({
              lat: finishObj.lat,
              lng: finishObj.lng
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
  saveRoute() {
    const userInfo = this.userService.getCurrentUserInfo();
    const routeObject = {
      startObj: this.startObj,
      finishObj: this.finishObj,
      driverId: userInfo.id,
      date: this.date,
      time: this.time
    };
    this.userService.postRoute(routeObject).subscribe( resp => {
      this.startObj = {
        address: '',
        lat: null,
        lng: null
      };
      this.finishObj = {
        address: '',
        lat: null,
        lng: null
      };
      this.date = '';
      this.time = '';
    });
  }
}
