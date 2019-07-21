import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  userForm = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    password: [''],
    password_confirm: ['']

  })

  ngOnInit() {
  }

  register() {
    this.userService.register(this.userForm.getRawValue()).subscribe((result:any) => {
      console.log(result);
      if (result.status === 201) {
        this.router.navigate['/rideshare'];
      }
    }, (err) =>{
        console.log("!!!error in registration", err);
    });

  }

}
