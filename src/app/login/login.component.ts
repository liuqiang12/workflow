import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {routerTransition} from '../router.animations';

import  {LoginUserModel}  from './models';
import {UserService} from './services';



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
  loginUserModel = new LoginUserModel(null,null,null);
  constructor(
    public router: Router,
    public userService : UserService
  ) {}

  ngOnInit() {
    //设置默认的登录用户名称和用户密码
    //this.loginUserModel = this.userService.getLoginDefault();//暂时没有使用了
    this.userService.getLoginDefaultFromJsonFile().subscribe(data =>
      {
        this.loginUserModel.id = data['id'];
        this.loginUserModel.name = data['name'];
        this.loginUserModel.password = data['password'];
        console.log(this.loginUserModel)
      },
      error => {
        console.log("调用出错了!")
      }
    );
  }
  onLoggedin() {
    console.log(this.loginUserModel)
  }
}
