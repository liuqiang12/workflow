import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {routerTransition} from '../../../router.animations';

import  {LoginUserModel}  from './login-user-model';
import {UserService} from '../../../services/systems/user.service';

/**
 * 使用服务
 * 1：导入服务
 * 2：声明服务
 * 3:注入服务
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  providers: [UserService]
})
//模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
export class LoginComponent implements OnInit {
  loginUserModel : LoginUserModel;
  constructor(
    public router: Router,
    public userService : UserService
  ) {}

  ngOnInit() {
    //设置默认的登录用户名称和用户密码
    this.loginUserModel = this.userService.getLoginDefault();
    console.log(this.loginUserModel)
  }
  onLoggedin() {
    console.log(this.loginUserModel)
  }
}
