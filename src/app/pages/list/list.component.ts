import { Component, OnInit } from '@angular/core';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import * as showdown from 'showdown';
const conv = new showdown.Converter();

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
  dataLoaded = false;
  faAngleRight = faAngleRight;

  constructor(private fetchService: APIFetchService) { }

  ngOnInit() {
    if (apiData === null) {
      this.fetchService.getAPIData().subscribe(data => {
        apiData = data;
        conv.setOption('headerLevelStart', 5);

        // Render markdown as HTML
        for (const cls of apiData.classes) {
          for (const api of cls.list) {
            api.description = conv.makeHtml(api.description.replace(/\\n/g, '\n'));
          }
        }

        this.apis = apiData;
        this.dataLoaded = true;
      });
    } else {
      this.apis = apiData;
      this.dataLoaded = true;
    }
  }

}
