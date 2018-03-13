import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {routerTransition} from '../../../router.animations';

import  {User}  from '../../../models/systems/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  users:User[];
  loginUser:User;
  constructor(public router: Router) {}

  ngOnInit() {
  }

  onLoggedin(f: NgForm) {
    console.log(f)
    console.log("=======================")
    localStorage.setItem('isLoggedin', 'true');
  }
}
