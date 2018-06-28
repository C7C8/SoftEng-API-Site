import { Component, OnInit, Input } from '@angular/core';
import { faAngleRight, faStar, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../../api-data';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {
  @Input() api: API;
  faAngleRight = faAngleRight;
  faStar = faStar;
  faExclamation = faExclamation;

  constructor() { }

  ngOnInit() {
  }

  report() {
  }

  like() {
  }

}
