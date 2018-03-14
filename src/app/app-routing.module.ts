import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCanActivateGuard } from './components/commons/guard/login-can-activate-guard';

/**
 *默认进入登录界面
 * 点击登录，利用路由跳转到主界面
  */
const routes: Routes = [
  { path: '', loadChildren: './components/commons/login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//根级路由情况
  exports: [RouterModule]
})
export class AppRoutingModule { }
