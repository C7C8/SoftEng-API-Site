import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { faEllipsisH, faStar, faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../../api-data';

// Lifted straight out of the angular docs, unfortunately -- errors when control is dirty, touched, or submitted
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) : boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {
  @Input() api: API;
  @Input() admin = false;
  edit = false;
  versionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\d+\\.\\d+\\.\\d+'),
  ]);
  matcher = new MyErrorStateMatcher();

  newVersionDesc: string;
  newVersionNum: string;
  newImage: any;

  faStar = faStar;
  faExclamation = faExclamation;
  faTrash = faTrash;
  faEllipsisH = faEllipsisH;

  constructor() { }

  ngOnInit() {
  }

  report(): void {
  }

  like(): void {
  }

  delete(): void {
  }

  changeImage(): void {
  }

  newVersion(): void {
  }

  submit(): void {
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
}
