import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hackmobility';
  showRegister;

  constructor(
    private userService: UserService,
    private router: Router,
    ) {

  }

  ngOnInit() {
    this.showRegister = this.userService.isUserLoggedin();
  }

  logout() {
    this.userService.logout().subscribe((result) => {
      this.router.navigate([""]);
    })
  }
}
