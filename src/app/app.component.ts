import { Component, OnInit } from '@angular/core';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    // Verify JWT in localstorage with server & load user's info.
    //验证JWT中存储的用户信息存储，项目启动时只运行一次
    // This runs once on application startup.
    this.userService.populate();
  }
}
