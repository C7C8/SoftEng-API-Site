import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './confirm-delete-api.component.html',
  styleUrls: ['./confirm-delete-api.component.scss']
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
