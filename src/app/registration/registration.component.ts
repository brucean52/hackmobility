import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: ['']
  })

  ngOnInit() {
  }

  register() {
    this.userService.register(this.userForm.getRawValue());
  }

}
