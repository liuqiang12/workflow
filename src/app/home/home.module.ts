import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';

/**
 * 顶部路由情况
 * 首页路由path也可以写成./一定要有点
 * @type {ModuleWithProviders}
 */
const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    //等数据加载完毕后再路由界面，否则会出现UI抖动
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
