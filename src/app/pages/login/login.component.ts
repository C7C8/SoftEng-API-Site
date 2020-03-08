import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inProgress = false;
  emailFieldControl = new FormControl('', [Validators.required, Validators.email]);
  username = '';
  password = '';

  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  // Hack for getting login-on-'Enter' to work, because having two buttons the form is messing with Angular forms
  // (somehow). I don't have enough time to properly understand and fix it, so here's a manual solution...
  async loginGuard(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.emailFieldControl.valid && this.password.length > 0) {
      this.login();
    }
  }

  async login() {
    if (this.userService.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.inProgress = true;
    const response = await this.userService.login(this.username, this.password);
    this.inProgress = false;
    if (response.status === 'success') {
      this.snackbar.open('Logged in as ' + this.username + '!', '', {duration: 2000});
      this.router.navigate(['/manage']);
    } else {
      this.snackbar.open(response.message, '', {duration: 2000});
    }
  }

  async register() {
    if (this.userService.isLoggedIn()) {
      this.snackbar.open('You\'re already logged in!', '', {duration: 2000});
      return;
    }

    this.inProgress = true;
    const response = await this.userService.register(this.username, this.password);
    this.inProgress = false;

    if (response.status === 'success') {
      this.snackbar.open('Successfully registered as ' + this.username, '', {duration: 2000});
      await this.userService.login(this.username, this.password);
      this.router.navigate(['/manage']);
    } else {
      this.snackbar.open('Failed to register, this username is probably already taken', '', {duration: 2000});
    }
  }
}
