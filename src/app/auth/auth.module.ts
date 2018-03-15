import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { LoadingMaskModule } from '../loading-mask/loading-mask.module'
import { environment } from '../../environments/environment.prod';
import { SharedModule } from '../shared';
import {environment} from '../../environments/environment';

/**
 * 顶部路由
 * @type {ModuleWithProviders}
 */
const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
    LoadingMaskModule.forRoot({
      snippet: {
        imgUrl: '/assets/images/ripple.svg',
        size: 144
      },
      debug: true
    })/* 进度条情况 */
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
