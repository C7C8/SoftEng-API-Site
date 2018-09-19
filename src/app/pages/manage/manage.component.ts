import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { APIFetchService } from '../../apifetch.service';
import { Router } from '@angular/router';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PyAPIResponse, PyAPISubmission } from '../../api-data';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDeleteAccountComponent } from './confirm-delete-account/confirm-delete-account.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(public userService: UserService,
              public fetchService: APIFetchService,
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) { }
  emailFieldControl = new FormControl('', [Validators.required, Validators.email]);
  letters: string[] = [];

  newAPIName: string;
  newAPIContact: string;
  newAPITerm: string;
  newAPITeam: string;
  newAPIYear: number = (new Date()).getFullYear();

  ngOnInit() {
    // There has to be a better way of doing this, I'm just super lazy
    for (let i = 0; i < 26; i++){
      // IN A SANE LANGUAGE I COULD JUST ADD A NUMBER TO A LETTER AND IT'D BE FINE
      // WHY DO YOU DO THIS TO ME JAVASCRIPT?
      this.letters.push(String.fromCharCode('A'.charCodeAt(0) + i));
    }

    if (this.fetchService.apiData === null || this.fetchService.userApis.length === 0) {
      this.fetchService.filterToUserAPIs(this.userService.getUsername());
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/list']);
  }

  handleDelete(id: string) {
    // Refresh API list to show changes
    this.fetchService.getAPIData(() => {
      this.fetchService.filterToUserAPIs(this.userService.getUsername());
    });
  }

  submitAPI(submitForm: NgForm): void {
    const info: PyAPISubmission = {
      action: 'create',
      info: {
        name: this.newAPIName,
        contact: this.newAPIContact,
        term: this.newAPITerm,
        year: this.newAPIYear,
        team: this.newAPITeam,
        description: ''
      }
    };

    this.userService.createAPI(info, (response: PyAPIResponse) => {
      this.snackbar.open(response.message, '', {duration: 3000});
      if (response.status === 'success') {
        submitForm.resetForm();
        this.emailFieldControl.reset();

        // Refresh API list to show changes
        this.fetchService.getAPIData(() => {
          this.fetchService.filterToUserAPIs(this.userService.getUsername());
        });
      }
    });
  }

  confirmDelete(): void {
    this.dialog.open(ConfirmDeleteAccountComponent);
  }
}
