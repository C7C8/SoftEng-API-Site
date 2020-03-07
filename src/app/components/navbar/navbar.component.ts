import { Component, OnInit } from '@angular/core';

export class NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navLinks: NavLink[] = [
    { path: '/home', label: 'Home' },
    { path: '/list', label: 'API List' },
    { path: '/manage', label: 'Manage APIs'},
    { path: '/about', label: 'About'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
