import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private userv: UserService, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  login(): void {
    if (this.username.length === 0 || this.password.length === 0) {
      return;
    }

    if (this.userv.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.userv.login(this.username, this.password, this.loginCallback.bind(this));
  }

  loginCallback(success: boolean): void {
    if (success) {
      this.snackbar.open('Logged in as ' + this.username + '!', '', {duration: 2000});
    } else {
      this.snackbar.open('Could not verify credentials', '', {duration: 2000});
    }
  }

  register(): void {
    if (this.username.length === 0 || this.password.length === 0) {
      return;
    }

    if (this.userv.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.userv.register(this.username, this.password, this.registerCallback.bind(this));
  }

  registerCallback(success: boolean): void {
    if (success) {
      this.snackbar.open('Successfully registered as ' + this.username, '', {duration: 2000});
      this.userv.login(this.username, this.password);
    } else {
      this.snackbar.open('Failed to register, this username is probably already taken', '', {duration: 2000});
    }
  }
}
