import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../../../user.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('file') nativeFile;
  file: File = null;

  constructor(public dialogRef: MatDialogRef<FileUploadComponent>, public userService: UserService) { }

  ngOnInit() {
  }

  addFile(): void {
    console.log('Click!');
    this.nativeFile.nativeElement.click();
  }

  onFileAdded(): void {
    this.file = this.nativeFile.nativeElement.files[0];
    console.log('Got file: ', this.file);
  }
}
