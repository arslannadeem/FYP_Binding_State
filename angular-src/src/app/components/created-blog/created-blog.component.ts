import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Blogger } from '../../models/blogger';
import { SharedserviceService } from '../../services/sharedservice.service';
import { Blog } from '../../models/blog';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Answers } from '../../models/answers';
import { UpdateblogService } from '../../services/updateblog.service';
import { InsertanswerService } from '../../services/insertanswer.service';
import { BlogdataService } from '../../services/blogdata.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
@Component({
  selector: 'app-created-blog',
  templateUrl: './created-blog.component.html',
  providers: [DatePipe]
})
export class CreatedBlogComponent implements OnInit {
  public check: any = false;
  answer_user: Array<Answers>;
  description: string;
  totalcomments: number;
  tagslist: Array<string>;
  blog: Blog;
  topic: string;
  date: string;
  dataname: string;
  dataemail: string;
  answers: string;
  answerslist: Array<Answers>;
  bloglist: Array<Blog>;

  // @Output() bloglist = new EventEmitter<Blogger>();


  constructor(private shared: SharedserviceService, @Inject(LOCAL_STORAGE) private storage: WebStorageService
    , private route: ActivatedRoute, private router: Router, private datepipe: DatePipe, private updateblog: UpdateblogService,
    private insertans: InsertanswerService, private blogdata: BlogdataService) {
    try {
      this.bloglist = new Array<Blog>();
    this.answer_user = new Array<Answers>();
      this.answerslist = new Array<Answers>();
    this.tagslist = new Array<string>();
    this.blog = new Blog();
    this.blog = this.shared.getblog();
   // console.log(this.blog.TotalAnswers);

    this.totalcomments = this.blog.getcomments();
    this.topic = this.blog.gettopic();
    this.date = this.blog.getdate().toString();
    this.totalcomments = 0;
    this.description = this.blog.getdescription();
    this.answers = '';
    this.tagslist = this.blog.gettags();
    this.dataname =  this.getFromLocal('username');
    this.dataemail = this.getFromLocal('useremail');
    console.log(this.dataemail + ' ' + this.dataname);

    if ( this.dataemail === null && this.dataname === null) {
      this.router.navigateByUrl('/user-login');
    }

  } catch ( err ) {

  }
  }
  getFromLocal(key): string {
    // console.log('recieved= key:' + key);
    const data = this.storage.get(key);
    // console.log(data);
    return data;
  }
  answeredpressed() {
    try {
    this.datepipe = new DatePipe('en-Us');
    const now = Date.now();
    const myFormattedDate = this.datepipe.transform(now, 'short');
    console.log('date ' + myFormattedDate);
    const localdate = new Date();
     this.bloglist =  this.blogdata.getdata();
    for ( let i = 0; i < this.bloglist.length ; i++) {
      console.log(this.bloglist[i].getdate() + ' ' + this.blog.getdate());

    if (this.bloglist[i].getdate() === this.blog.getdate()) {
        this.blog.setkey(this.bloglist[i].getkey());
    }

  }

    // tslint:disable-next-line:prefer-const
    let ans_user = new Answers();
    ans_user.setanswer(this.answers);
    ans_user.setdate(myFormattedDate.toString());
    ans_user.setemail(this.dataemail);
    ans_user.setname(this.dataname);
    ans_user.setblogkey(this.blog.getkey());
      this.answers = '';
  this.answerslist.push(ans_user);
 // this.blog.settotalanswers(this.answerslist);
  console.log('key ' + this.blog.getkey());
      this.insertans.insertblog(ans_user);
      this.answers = '';

      this.totalcomments = this.addnumbers(this.totalcomments, 1);
      console.log(this.totalcomments);

      this.updateblog.updateblogger(this.blog.getkey(), { comments: this.totalcomments});

    } catch ( err ) {}
  }
  ngOnInit() {
  }
addnumbers(fnum: number, snum: number) {
return (fnum + snum);
}
}
