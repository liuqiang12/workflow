import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//表单模块
import { FormsModule }   from '@angular/forms';
//路由模块
import { LoginRoutingModule } from './login-routing.module';
//登录组件
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,//NgIf、NgFor等指令
    LoginRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent]//模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
})
export class LoginModule { }//来控制将哪些内部成员暴露给外部使用
