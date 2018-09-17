import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material';
import { faEllipsisH, faStar, faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API, PyAPIResponse, PyAPISubmission } from '../../../api-data';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserService } from '../../../user.service';

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
  edit = false;
  versionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d+\\.\\d+\\.\\d+'),
  ]);
  matcher = new MyErrorStateMatcher();

  newVersionDesc = '';
  newVersionNum = '';
  uploading = false;

  faStar = faStar;
  faExclamation = faExclamation;
  faTrash = faTrash;
  faEllipsisH = faEllipsisH;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
  }

  report(): void {
  }

  like(): void {
  }

  delete(): void {
  }

  changeImage(): void {
    this.dialog.open(FileUploadComponent, {
      data: File
    })
      .afterClosed().subscribe((result: File) => {
        if (result === null || result === undefined) {
          return;
        }
        this.uploading = true;
        const reader = new FileReader();
        reader.onload = (event: Event) => {
          this.api.updated = new Date();
          this.api.image = reader.result;

          // TODO: Perform submission logic
          const submission: PyAPISubmission = {
            action: 'update',
            id: this.api.id,
            info: {
              image: reader.result.toString().split(',')[1]
            }
          };

          this.userService.submitUpdate(submission, (response: PyAPIResponse) => {
            if (response.status !== 'error') {
              this.snackbar.open('Submitted new image!', '', {duration: 2000});
            } else {
              this.snackbar.open(response.message, '', {duration: 2000});
            }
            this.uploading = false;
          });
        };
        reader.readAsDataURL(result);
      }
    );
  }

  newVersion(): void {
    this.dialog.open(FileUploadComponent, {
      data: File
    })
      .afterClosed().subscribe((result: File) => {
      if (result === null || result === undefined) {
        return;
      }

      this.uploading = true;
      const reader = new FileReader();
      reader.onload = (event: Event) => {
        const submission: PyAPISubmission = {
          action: 'update',
          id: this.api.id,
          info: {
            version: this.newVersionNum + ' ' + this.newVersionDesc,
            jar: reader.result.toString().split(',')[1]
          }
        };

        this.userService.submitUpdate(submission, (response: PyAPIResponse) => {
          if (response.status !== 'error') {
            this.snackbar.open('Submitted new version!', '', { duration: 2000 });
          } else {
            this.snackbar.open(response.message, '', { duration: 2000 });
          }

          this.uploading = false;
          this.api.history.unshift(this.newVersionNum + ' ' + this.newVersionDesc);
          this.api.updated = new Date();
          this.newVersionDesc = '';
          this.versionFormControl.reset();
        });
      };
      reader.readAsDataURL(result);

    });
  }

  submit(): void {
    const submission: PyAPISubmission = {
      action: 'update',
      id: this.api.id,
      info: {
        name: this.api.name,
        description: this.api.description,
      }
    };

    this.userService.submitUpdate(submission, (response: PyAPIResponse) => {
      if (response.status !== 'error') {
        this.snackbar.open('Submitted changes!', '', { duration: 2000 });
      } else {
        this.snackbar.open(response.message, '', { duration: 2000 });
      }
      this.edit = false;
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  setEdit(edit: boolean) {
    this.edit = edit;
  }
}
