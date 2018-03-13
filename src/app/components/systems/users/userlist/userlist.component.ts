import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../../services/systems/user.service";
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }
  datas:string[];
  ngOnInit() {
    //初始化的时候，就获取了用户列表信息
    this.userService.getUsers().subscribe(data =>{
      this.datas = data['data'];
      console.log(this.datas)
    });
  }

}
