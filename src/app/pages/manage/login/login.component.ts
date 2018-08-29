import { Component, OnInit } from '@angular/core';

class Login {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: Login;

  constructor() { }

  ngOnInit() {
  }

  login(): void {
    console.log('Login pressed! ' + this.loginInfo.username);
  }

  register(): void {
    console.log('Register pressed! ' + this.loginInfo.password);
  }
}
