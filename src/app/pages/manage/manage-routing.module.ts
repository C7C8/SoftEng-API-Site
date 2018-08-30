import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { UserService } from '../../user.service';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [UserService]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class ManageRoutingModule { }
