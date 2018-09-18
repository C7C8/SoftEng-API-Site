import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { APIFetchService } from '../../apifetch.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(public userService: UserService, public fetchService: APIFetchService, private router: Router) { }
  letters: string[] = [];

  newAPIName: string;
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

    if (this.fetchService.apiData === null) {
      this.fetchService.getFilteredAPIs(this.userService.getUsername());
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/list']);
  }

  handleDelete(id: string) {
    this.fetchService.deleteAPI(id);
    this.fetchService.getFilteredAPIs(this.userService.getUsername());
  }

  submitAPI(submitForm: NgForm): void {
    // TODO: add submission logic
    submitForm.resetForm();
  }
}
