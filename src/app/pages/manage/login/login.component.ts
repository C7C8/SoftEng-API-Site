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
    console.log('Login clicked!');
  }

  register(): void {
    console.log('Register clicked!');
  }
}
