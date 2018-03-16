import { Component, OnInit } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  currentUser: User;

  ngOnInit() {
    /**
     * 获取当前用户数据
     *  AuthComponent.submitForm
     *
     */
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData);
        this.currentUser = userData;
      }
    );
  }
}
