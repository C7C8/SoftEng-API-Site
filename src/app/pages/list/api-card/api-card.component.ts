import { Component, OnInit, Input } from '@angular/core';
import { faAngleRight, faStar, faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../../api-data';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {
  @Input() api: API;
  @Input() admin = false;
  faStar = faStar;
  faExclamation = faExclamation;
  faTrash = faTrash;

  constructor() { }

  ngOnInit() {
  }

  report() {
  }

  like() {
  }

  delete(){
  }

}
