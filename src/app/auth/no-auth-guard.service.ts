import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../shared';
import { take, map } from 'rxjs/operators';

/**
 * 判断是否具有权限[服务]
 * 是否激活路由情况
 * 注入路由
 * 注入用户服务
 */
@Injectable()
export class NoAuthGuard implements CanActivate {
  /**
   * 注入路由和用户
   * @param {Router} router
   * @param {UserService} userService
   */
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  /**
   * 构造函数
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean>}
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  /**
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean>}
   */
  Observable<boolean> {
    console.log(this.userService.isAuthenticated)

    return this.userService.isAuthenticated.pipe(
      take(1),//取前一个
      map(isAuth => !isAuth)
    );
  }
}
