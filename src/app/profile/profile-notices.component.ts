import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NoticeListConfig, Profile } from '../shared';

@Component({
  selector: 'app-profile-notices',
  templateUrl: './profile-notices.component.html'
})
export class ProfileNoticesComponent  implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  noticesConfig: NoticeListConfig = {
    type: 'all',
    filters: {}
  };

  /**
   * 个人中心，需要获取该用户下的所有通知信息
   */
  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.noticesConfig = {
          type: 'all',
          filters: {}
        }; // Only method I found to refresh notice load on swap
        this.noticesConfig.filters.author = this.profile.username;
      }
    );
  }

}
