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
  fname: string = null;

  constructor(public dialogRef: MatDialogRef<FileUploadComponent>, public userService: UserService) { }

  ngOnInit() {
  }

  addFile(): void {
    this.nativeFile.nativeElement.click();
  }

  onFileAdded(): void {
    this.file = this.nativeFile.nativeElement.files[0];
    this.fname = this.file.name; // Because referencing {{file.name}} in the HTML won't work...
  }

  submit(): void {
    return this.dialogRef.close(this.file);
  }

  cancel(): void {
    return this.dialogRef.close();
  }
}
