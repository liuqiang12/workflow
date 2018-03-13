import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './components/commons/nav/nav.component';
import { AlertComponent } from './components/commons/alert/alert.component';
import { UserlistComponent } from './components/systems/users/userlist/userlist.component';
// 路由
import { RouterModule, Routes } from "@angular/router";
//系统用户服务
import { UserService } from "./services/systems/user.service";

import { LoginCanActivateGuard } from './components/commons/guard/login-can-activate-guard';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const appRoutes=[
  {path:"alert", component:AlertComponent},
  {path:"users", component:UserlistComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AlertComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [UserService,LoginCanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
