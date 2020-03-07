import { Component, OnInit } from '@angular/core';
import { APIFetchService } from '../../apifetch.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(public fetchService: APIFetchService) { }

  ngOnInit() {
    if (this.fetchService.apiData == null) {
      this.fetchService.getAPIData();
    }
  }
}
