import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { BaseService } from "../commons/base.service";
@Injectable()
export class UserService {
  userUrl = 'assets/json/user.json';
  constructor(
    private http:HttpClient
  ) { }
// 获取用户列表
  getUsers(){
    return this.http.get(BaseService.BaseUrl+this.userUrl);
  }
}
