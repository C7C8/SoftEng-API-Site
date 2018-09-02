import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
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

        // TODO: Clean!
        this.apis = apiData;
        this.dataLoaded = true;
      });
    } else {
      this.apis = apiData;
      this.dataLoaded = true;
    }
  }

}
