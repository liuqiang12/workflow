import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { BaseService } from "../commons/base.service";
import {LoginUserModel} from '../../components/commons/login/login-user-model';
@Injectable()
export class UserService {
  //构造方法，注入http类
  constructor(
    private http:HttpClient
  ) { };

  userUrl = 'assets/json/user.json';
  loginDefaultData: Array<{ id: number; name: string;password: string }> = [
    { id:1,name: 'admin', password:'888888' }
  ];

// 获取用户列表
  getLoginDefaultFromJsonFile(){
    return this.http.get(BaseService.BaseUrl+this.userUrl);
  }
  //获取默认的用户名称和密码
  getLoginDefault(){
    let loginUser : LoginUserModel;

    for (let entry of this.loginDefaultData) {
      loginUser.id = entry.id;
      loginUser.name = entry.name;
      loginUser.password = entry.password;
    }
    return loginUser;
  }
}
