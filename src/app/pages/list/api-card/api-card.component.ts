import { Component, OnInit, Input } from '@angular/core';
import { API } from '../../../api-data';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {
  @Input() api: API;

  constructor() { }

  ngOnInit() {
  }

}
