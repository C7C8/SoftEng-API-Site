import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { API, APIData } from '../../api-data';
import { APIFetchService } from '../../apifetch.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  dataLoaded = false;
  apis: API[] = [];

  constructor(public userService: UserService, private fetchService: APIFetchService) { }

  ngOnInit() {
    if (!this.dataLoaded) {
      this.fetchService.getAPIData().subscribe(data => {
        for (const cls of data.classes) {
          for (const api of cls.apis) {
            // TODO: Maybe embed username in API owner?
            if (api.contact === this.userService.getUsername() || this.userService.getUsername() === '') {
              this.apis.push(api);
            }
          }
        }
        this.dataLoaded = true;
      });
    }
  }

  logout(): void {
  }
}
