import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//客户http请求
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { NavComponent } from './components/commons/nav/nav.component';
import { AlertComponent } from './components/commons/alert/alert.component';
import { UserlistComponent } from './components/systems/users/userlist/userlist.component';


import { LoginCanActivateGuard } from './components/commons/guard/login-can-activate-guard';

import { AppRoutingModule } from './app-routing.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,

    BrowserAnimationsModule,
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    AlertComponent,
    UserlistComponent
  ],
  providers: [LoginCanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
