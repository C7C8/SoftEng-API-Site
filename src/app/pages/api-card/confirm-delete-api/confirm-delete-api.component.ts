import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './confirm-delete-api.component.html',
  styleUrls: ['./confirm-delete-api.component.css']
})
export class ConfirmDeleteApiComponent implements OnInit {

  warning = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteApiComponent>) { }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  warn() {
    this.warning = true;
  }
}
