import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  ownerId: string;
  carInfo: any;

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

}
