import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.css']
})
export class ConfirmDeleteAccountComponent implements OnInit {

  username: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteAccountComponent>) { }

  ngOnInit() {
  }

  confirm(): void {
    this.dialogRef.close({
      result: true,
      username: this.username,
      password: this.password
    });
  }

  cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }
}
