import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.css']
})
export class AreYouSureComponent implements OnInit {

  warning = false;

  constructor(public dialogRef: MatDialogRef<AreYouSureComponent>) { }

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
