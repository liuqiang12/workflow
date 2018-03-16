import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService, UserService } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * 主界面布局
 */
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
      console.log("home.component.ts>>>>>>>>>>>>>>>>>")
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {

        console.log(authenticated);
        this.isAuthenticated = authenticated;
        // set the article list accordingly:[相应地设置文章列表]
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.tagsService.getAll()
      .subscribe(tags => {
        console.log(tags)

        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
