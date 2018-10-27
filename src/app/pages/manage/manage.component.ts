import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { APIFetchService } from '../../apifetch.service';
import { Router } from '@angular/router';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PyAPIResponse, PyAPISubmission, User, UserChange } from '../../api-data';
import { MatDialog, MatPaginator, MatSlideToggleChange, MatSnackBar, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ConfirmDeleteAccountComponent } from './confirm-delete-account/confirm-delete-account.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  displayColumns: string[] = ['username', 'admin'];
  userlist = new MatTableDataSource<User>();


  async ngOnInit() {
    // There has to be a better way of doing this, I'm just super lazy
    for (let i = 0; i < 26; i++) {
      // IN A SANE LANGUAGE I COULD JUST ADD A NUMBER TO A LETTER AND IT'D BE FINE!
      // WHY DO YOU DO THIS TO ME, JAVASCRIPT?
      this.letters.push(String.fromCharCode('A'.charCodeAt(0) + i));
    }

    if (this.fetchService.apiData === null || this.fetchService.userApis.length === 0) {
      this.fetchService.filterToUserAPIs(this.userService.getUsername());
    }

    if (this.userService.admin) {
      const users: User[] = await this.userService.getUsers();
      this.userlist = new MatTableDataSource<User>(users);
      this.userlist.sort = this.sort;
      this.userlist.paginator = this.paginator;
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/list']);
    this.userlist = new MatTableDataSource<User>(); // Clear old data?
  }

  handleDelete(id: string) {
    // Refresh API list to show changes. Admins can see everything.
    if (!this.userService.admin) {
      this.fetchService.getAPIData(() => {
        this.fetchService.filterToUserAPIs(this.userService.getUsername());
      });
    }
  }

  async submitAPI(submitForm: NgForm) {
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

    const response = await this.userService.createAPI(info);
    this.snackbar.open(response.message, '', {duration: 3000});
    if (response.status === 'success') {
      submitForm.resetForm();
      this.emailFieldControl.reset();

      // Refresh API list to show changes
      this.fetchService.getAPIData(() => {
        this.fetchService.filterToUserAPIs(this.userService.getUsername());
      });
    }
  }

  async confirmDelete() {
    const dialogResult = await this.dialog.open(ConfirmDeleteAccountComponent).afterClosed().toPromise();
    if (dialogResult.result) {
      const response = await this.userService.deleteUser(dialogResult.username, dialogResult.password);
      if (response.status === 'success') {
        this.snackbar.open('Deleted user!', '', { duration: 2000 });
        this.logout();
      } else {
        this.snackbar.open(response.message as string, '', { duration: 3000 });
      }
    }
  }

  async changeAdmin(event: MatSlideToggleChange, user) {
    const request: UserChange = { username: user.username, set_admin: event.checked };
    await this.userService.changeUser(request);
  }
}
