import { Component, OnInit } from '@angular/core';
import { HereService } from '../services/here.service';
@Component({
  selector: 'app-car',
  templateUrl: './carshare.component.html',
  styleUrls: ['./carshare.component.scss']
})
export class CarShareComponent implements OnInit {


  constructor(
    private hereService: HereService,
   ) { }

   ngOnInit(): void {
  }
}
