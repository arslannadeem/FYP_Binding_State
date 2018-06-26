import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetuserinfoService } from '../getuserinfo.service';
import { Users } from '../shared/users';
import { AdduserdataService } from '../users/adduserdata.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  find: Boolean;
  username: string;
  useremail: string;
  users: Users = <Users>{
   useremail: '',
   username: '',

  };
  constructor( private route: ActivatedRoute,
    private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private getuserinfo: GetuserinfoService,
    private adduserdata: AdduserdataService
  ) {

  }
  ngOnInit() {
  }
  Login() {
    this.find = false;
    if (this.username !== '' && this.useremail !== '') {
      this.saveInLocal('username', this.username);
      this.saveInLocal('useremail', this.useremail);
      this.getuserinfo.checkuserData(this.useremail).then(list => this.find = list);
      if ( this.find !== true) {
        this.users.useremail = this.useremail;

        this.users.username = this.username;
        this.adduserdata.insertuser(this.users);

        this.router.navigateByUrl('/add-discussion');
      } else {
      //  this.saveInLocal('username', this.username);
      //  this.saveInLocal('useremail', this.useremail);

        this.router.navigateByUrl('/add-discussion');
      }
    }
  }
  saveInLocal(key, val): void {
    console.log('==> recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);


  }
}

