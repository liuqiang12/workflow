import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {routerTransition} from '../../../router.animations';

import  {LoginUserModel}  from './login-user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
//模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
export class LoginComponent implements OnInit {

  loginUserModel = new LoginUserModel("admin","111111");
  constructor(public router: Router) {}

  ngOnInit() {
  }
  onLoggedin() {
    console.log(this.loginUserModel)
  }
}
