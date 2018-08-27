import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class ManageRoutingModule { }
