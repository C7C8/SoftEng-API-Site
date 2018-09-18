import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('file') nativeFile;
  file: File = null;
  fname: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FileUploadComponent>,
              public snackbar: MatSnackBar) { }

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
    this.snackbar.open('Uploading file, don\'t close the page until finished!');
    return this.dialogRef.close(this.file);
  }

  cancel(): void {
    return this.dialogRef.close();
  }
}
