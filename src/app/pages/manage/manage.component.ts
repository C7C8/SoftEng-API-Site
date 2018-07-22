import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
