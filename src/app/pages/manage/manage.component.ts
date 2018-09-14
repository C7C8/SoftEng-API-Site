import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { APIFetchService } from '../../apifetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(public userService: UserService, public fetchService: APIFetchService, private router: Router) { }

  ngOnInit() {
    if (this.fetchService.apiData === null) {
      this.fetchService.getFilteredAPIs(this.userService.getUsername());
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/list']);
  }
}
