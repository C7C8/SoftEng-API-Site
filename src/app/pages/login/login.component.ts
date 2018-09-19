import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { PyAPIResponse } from '../../api-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFieldControl = new FormControl('', [Validators.required, Validators.email]);
  username = '';
  password = '';

  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.userService.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.userService.login(this.username, this.password, this.loginCallback.bind(this));
  }

  loginCallback(response: PyAPIResponse): void {
    if (response.status === 'success') {
      this.snackbar.open('Logged in as ' + this.username + '!', '', {duration: 2000});
      this.router.navigate(['/manage']);
    } else {
      this.snackbar.open('Could not verify credentials', '', {duration: 2000});
    }
  }

  register(): void {
    if (this.userService.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.userService.register(this.username, this.password, this.registerCallback.bind(this));
  }

  registerCallback(response: PyAPIResponse): void {
    if (response.status === 'success') {
      this.snackbar.open('Successfully registered as ' + this.username, '', {duration: 2000});
      this.userService.login(this.username, this.password, () => { this.router.navigate(['/manage']); } );
    } else {
      this.snackbar.open('Failed to register, this username is probably already taken', '', {duration: 2000});
    }
  }
}
