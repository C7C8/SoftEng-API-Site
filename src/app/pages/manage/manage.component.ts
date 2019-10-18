import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { APIFetchService } from '../../apifetch.service';
import { Router } from '@angular/router';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PyAPIResponse, PyAPISubmission, User, UserChange } from '../../api-data';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteAccountComponent } from './confirm-delete-account/confirm-delete-account.component';
import { faUserTimes, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

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

  newAPIName = '';
  newAPIContact = '';
  newAPITerm = '';
  newAPITeam = '';
  newAPIYear: number = (new Date()).getFullYear();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  displayColumns: string[] = ['username', 'registered', 'last_login', 'admin'];
  userlist = new MatTableDataSource<User>();

  // These are needed. I know why. I know that it's stupid. I need a brick to ease the pain in my head...
  faUserTimes = faUserTimes;
  faLock = faLock;
  faUnlock = faUnlock;

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
    this.fetchService.userApis = [];
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
    // Submit a new API to the server
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
    // Confirm that the user wants to delete their account
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

  changeAdmin(event: MatSlideToggleChange, user) {
    // Change a user's admin status
    const request: UserChange = { username: user.username, set_admin: event.checked };
    this.userService.changeUser(request);
  }

  async adminDeleteUser(user: User) {
    // Administrator delete user; updates the user table if the operation succeeded
    const response: PyAPIResponse = await this.userService.adminDeleteUser(user.username);
    if (response.status !== 'success') {
      return;
    }

    const users: User[] = await this.userService.getUsers();
    this.userlist = new MatTableDataSource<User>(users);
    this.userlist.sort = this.sort;
    this.userlist.paginator = this.paginator;
  }

  async setUserLock(user: User) {
    // Enable lockout on a user's account; updates the user table if the operation succeeded
    const response: PyAPIResponse = await this.userService.lockUser(user.username, !user.locked);
    if (response.status !== 'success') {
      return;
    }

    const users: User[] = await this.userService.getUsers();
    this.userlist = new MatTableDataSource<User>(users);
    this.userlist.sort = this.sort;
    this.userlist.paginator = this.paginator;
  }
}
