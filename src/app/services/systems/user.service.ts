import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { BaseService } from "../commons/base.service";
@Injectable()
export class UserService {
  constructor(
    private http:HttpClient
  ) { }
// 获取用户列表
  getUsers(){
    this.http.get(BaseService.BaseUrl + "/api/users").subscribe((res) => {
      // 成功回调
      alert("成功回调函数");
    }, (err) => {
      // 失败回调
      alert("回调失败："+err);
    });
  }
}
