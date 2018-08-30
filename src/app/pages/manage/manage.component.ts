import { Component, OnInit} from '@angular/core';
import { UserService } from '../../user.service';
import { API, APIData } from '../../api-data';
import { APIFetchService } from '../../apifetch.service';
import * as showdown from 'showdown';
const conv = new showdown.Converter();

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
        const apiData: APIData = data;
        conv.setOption('headerLevelStart', 5);

        for (const cls of apiData.classes) {
          for (const api of cls.list) {
            // TODO: Remove debug case where no username is acceptable
            //if (api.contact === this.userService.getUsername() || this.userService.getUsername() === '') {
              api.description = conv.makeHtml(api.description.replace(/\\n/g, '\n'));
              this.apis.push(api);
            //}
          }
        }

        this.dataLoaded = true;
      });
    }
  }

  logout(): void {
  }
}
