import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (result => {
        if (result === true) {
          this.router.navigate(["main"]);
        } else {
          alert("Invalid credentials");
        }
      })
    )
  }
}