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

  constructor(
    private userService: UserService,
    private router: Router,
    ) {

  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe((result) => {
      this.router.navigate([""]);
    })
  }
}
