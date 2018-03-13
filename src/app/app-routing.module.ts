import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCanActivateGuard } from './components/commons/guard/login-can-activate-guard';
const routes: Routes = [
  { path: '', loadChildren: './components/commons/login/login.module#LoginModule'}
  //{ path: '', loadChildren: './components/commons/login/login.module#LoginModule', canActivate: [LoginCanActivateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
