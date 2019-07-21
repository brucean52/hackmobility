import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { smartcar } from '@smartcar/auth';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  ownerId: string;
  carInfo: any;
  private windowHandle: Window;   // reference to the window object we will create    


  carForm = this.fb.group({
    ownerId: [this.ownerId],
    carName: [''],
    make: [''],
    model: ['']
  })

  constructor(
      private carService: CarService,
      private userService: UserService,
      private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.ownerId = this.userService.getCurrentUserInfo().id;
    this.carService.getCarByOwner(this.ownerId).subscribe(
      (result: any) => {
        this.carInfo = result.carInfo;
      }
    )
  }

  addCar() {
    console.log(this.ownerId);
    this.carForm.patchValue({ownerId: this.ownerId});
    return this.carService.addCarToOwner(this.carForm.getRawValue())
      .subscribe((result) => {
        console.log("addCarToOwner", result);
      })
  }

  connectSmartCar() {
    return this.carService.getSmartCarOAuthURL().subscribe(
      (result:any) => {
        const {link} = result;
        this.windowHandle = this.createOauthWindow(link);
      }
    )
    // createOauthWindow
  }

  createOauthWindow(url: string, name = 'Authorization', width = 500, height = 600, left = 0, top = 0) {
    if (url == null) {
        return null;
    }
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
}

}
