import { Component, OnInit, Inject } from '@angular/core';
import { Blogger } from '../../models/blogger';
// import { RegisteruserService } from '../../services/registeruser.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/observable';
import { InsertbloggerService } from '../../services/insertblogger.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BloggerslistService } from '../../services/bloggerslist.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  bloggerlist: Array<Blogger>;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  dataname: string;
  datapassword: string;
  constructor(private route: ActivatedRoute, private router: Router, private insert: InsertbloggerService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
  private bloglist: BloggerslistService) {
    this.datapassword = '';
    this.dataname = '';
    this.bloggerlist = new Array<Blogger>();
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmpassword = '';
  //  this.bloggerlist = this.reguser.getallbloggers();
 // const blogger  = new Blogger();
  //  insert.createBlogger(blogger);
    this.dataname =  this.getFromLocal('name');
    this.datapassword =  this.getFromLocal('email');
    console.log(this.dataname + '  ' + this.datapassword);

if (this.dataname !== null || this.datapassword !== null) {
  this.router.navigateByUrl('/allblogs');

}

}
  getFromLocal(key): string {
   // console.log('recieved= key:' + key);
    const data = this.storage.get(key);
   // console.log(data);
    return data;
  }
  ngOnInit() {
  }
  onRegister() {
    this.bloggerlist = this.bloglist.getdata();
  //  this.bloggerlist = this.reguser.bloggerslist;
    let regcheck: boolean;
    // tslint:disable-next-line:prefer-const
    regcheck = false;
  if (this.name !== '' && this.email !== '' && this.confirmpassword !== '' && this.password !== '') {


  if (this.password === this.confirmpassword  && this.bloggerlist !== null) {
    for (let i = 0; i < this.bloggerlist.length; i++) {
          if (this.bloggerlist[i].email === this.email) {

            regcheck = true;
          }
    }
  }
  if (regcheck === false) {
    let blogitem = new Blogger();
    blogitem.setname(this.name);
    blogitem.setemail(this.email);
    blogitem.setpassword(this.password);
    const value = this.insert.createBlogger(blogitem);

    this.setFromLocal('name', this.name);
    this.setFromLocal('email', this.email);

    this.router.navigateByUrl('/allblogs');
  }
}


  }
  setFromLocal(key, val): void {
    this.storage.set(key, val);
  }
}
