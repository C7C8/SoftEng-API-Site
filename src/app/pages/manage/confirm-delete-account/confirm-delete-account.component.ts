import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.css']
})
export class ConfirmDeleteAccountComponent implements OnInit {

  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  confirm(): void {

  }

  cancel(): void {

  }

}
