import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material';
import { faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API, PyAPISubmission } from '../../api-data';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserService } from '../../user.service';
import { ConfirmDeleteApiComponent } from './confirm-delete-api/confirm-delete-api.component';

// Lifted straight out of the angular docs, unfortunately -- errors when control is dirty, touched, or submitted
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {
  @Input() api: API;
  @Input() admin = false;
  @Output() deleted = new EventEmitter<string>();

  edit = false;
  versionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d+\\.\\d+\\.\\d+'),
  ]);
  matcher = new MyErrorStateMatcher();

  // Can't bind directly to api.description, have to unescape it first so it's easier for the user to edit
  newDesc = '';
  newVersionDesc = '';
  newVersionNum = '';
  uploading = false;

  faTrash = faTrash;
  faEllipsisH = faEllipsisH;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
    // Holy hell, this is one ugly hack, but at least it does approximately what I want. Basically, just unescape some HTML, but without
    // a library -- this just uses the browser's parsing engine, which is probably better than anything I could do in JS.
    const temp = document.createElement('textarea');
    temp.innerHTML = this.api.description;
    this.newDesc = temp.value;
  }

  delete() {
    // Ask the user if they REALLY want to delete their API, delete it if they do.
    this.dialog.open(ConfirmDeleteApiComponent, null)
      .afterClosed().subscribe(async (result: boolean) => {
        if (result) {
          await this.userService.deleteAPI(this.api.id);
          this.deleted.emit(this.api.id);
        }
    });
  }

  changeImage(): void {
    this.dialog.open(FileUploadComponent, {
      data: { type: 'image/*' }
    })
      .afterClosed().subscribe((result: File) => {
        if (result === null || result === undefined) {
          return;
        }
        this.uploading = true;
        const reader = new FileReader();
        reader.onload = async (event: Event) => {
          this.api.image = reader.result;

          const submission: PyAPISubmission = {
            action: 'update',
            id: this.api.id,
            info: {
              image: reader.result.toString().split(',')[1]
            }
          };

          const response = await this.userService.submitUpdate(submission);
          if (response.status !== 'error') {
            this.snackbar.open('Submitted new image!', '', {duration: 2000});
          } else {
            this.snackbar.open(response.message, '', {duration: 2000});
          }
            this.uploading = false;
        };
        reader.readAsDataURL(result);
      }
    );
  }

  async newVersion() {
    const result = await this.dialog.open(FileUploadComponent, { data: { type: '.jar' } }) .afterClosed().toPromise();
    if (result === null || result === undefined) {
      return;
    }

    this.uploading = true;
    const reader = new FileReader();
    reader.onload = async (event: Event) => {
      const submission: PyAPISubmission = {
        action: 'update',
        id: this.api.id,
        info: {
          version: this.newVersionNum + ' ' + this.newVersionDesc,
          jar: reader.result.toString().split(',')[ 1 ]
        }
      };

      const response = await this.userService.submitUpdate(submission);
      if (response.status !== 'error') {
        this.snackbar.open('Submitted new version!', '', { duration: 2000 });
        this.api.history.unshift(this.newVersionNum + ' ' + this.newVersionDesc);
        this.api.updated = new Date();
        this.newVersionDesc = '';
        this.versionFormControl.reset();
      } else {
        this.snackbar.open(response.message, '', { duration: 2000 });
      }

      this.uploading = false;
    };

    reader.readAsDataURL(result);
  }

  async submit() {
    const submission: PyAPISubmission = {
      action: 'update',
      id: this.api.id,
      info: {
        name: this.api.name,
        description: this.newDesc
      }
    };

    const response = await this.userService.submitUpdate(submission);
    if (response.status !== 'error') {
      this.snackbar.open('Submitted changes!', '', { duration: 2000 });

      // Yet another ugly hack, this time to escape HTML so it renders correctly on the API display page
      const text = document.createTextNode(this.newDesc);
      const node = document.createElement('textarea');
      node.appendChild(text);
      this.api.description = node.innerHTML;

      this.edit = false;
    } else {
      this.snackbar.open('Submission failed, did you input illegal text?', '', { duration: 3000 });
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  setEdit(edit: boolean) {
    this.edit = edit;
  }
}
