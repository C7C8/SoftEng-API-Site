import { Component, OnInit } from '@angular/core';

import { APIFetchService } from '../../apifetch.service';
import { APIData } from '../../api-data';

let apiData: APIData = null;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  apis: APIData = null;

  constructor(private fetchService: APIFetchService) { }

  ngOnInit() {
    if (apiData === null) {
      this.fetchService.getAPIData().subscribe(data => {
        apiData = data;
        this.apis = apiData;
      });
    } else {
      this.apis = apiData;
    }
  }

}
