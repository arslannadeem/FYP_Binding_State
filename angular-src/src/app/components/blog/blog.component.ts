import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { Blogger } from '../../models/blogger';
import { Maps } from '../../models/maps';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { SharedserviceService } from '../../services/sharedservice.service';
import { InsertbloggerService } from '../../services/insertblogger.service';
import { InsertblogService } from '../../services/insertblog.service';
import { Answers } from '../../models/answers';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  providers: [DatePipe]
})

export class BlogComponent implements OnInit {
  safe: SafeResourceUrl;
  url: SafeResourceUrl;
  bloggerlist: Array<Blogger>;
  tagslist: Array<string>;
  title: string;
  question: string;
  descrption: string;
  tags: string;
  map: string;
  location: string;
  maps: string;
  mapslist: Array<Maps>;
  map_object: Maps;
  dataname: string;
  dataemail: string;
  answerslist: Answers;
  // anslist: Array<Answers>;

  blogcreated: Blog;
  constructor(private sanitizer: DomSanitizer, private elRef: ElementRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private date: DatePipe,
     private route: ActivatedRoute, private router: Router, private shared: SharedserviceService,
      private insertblog: InsertblogService ) {
  //  this.mapslist = new Array<Maps>();
    // this.anslist = new Array<Answers>();
    this.answerslist = new Answers;
    this.bloggerlist = new Array<Blogger>();
    this.tags = '';
    this.title = '';
    this.descrption = '';
    this.question = '';
    this.tagslist = new Array<string>();

    // tslint:disable-next-line:max-line-length
    this.map = '&key=AIzaSyCyP2TexHkARFI45ec1b9VEFwlNt2BdBPQ'; //
   // const m = '&key=AIzaSyCyP2TexHkARFI45ec1b9VEFwlNt2BdBPQ';
    this.location = ''; //
    const loc =  'https://www.google.com/maps/embed/v1/place?q=kashmir Hwy, Islamabad, Islamabad Capital Territory, Pakistan';
    this.maps = loc + this.map;
  //  this.map_object = new Maps(this.maps);
  //  this.mapslist.push(this.map_object);
    this.url = sanitizer.bypassSecurityTrustResourceUrl(this.maps);
    this.safe = sanitizer.bypassSecurityTrustResourceUrl(this.maps);
    this.dataname = this.getFromLocal('username');
    this.dataemail = this.getFromLocal('useremail');
   }
  getFromLocal(key): string {
    // console.log('recieved= key:' + key);
    const data = this.storage.get(key);
    // console.log(data);
    return data;
  }
   getlocation(): string {
     return this.map_object.location;
   }
  ngOnInit() {

      // $('button').click(function () {
      //   alert('hi');
      // });
  //  this.bloggerlist = this.reguser.getallbloggers();
  }
  submitblog() {
   // const now = moment().format('LLLL');
   // this.localdate = new Date('en-Us');
   // console.log(this.localdate);
    this.date = new DatePipe('en-Us');
    const now = Date.now();
    const myFormattedDate = this.date.transform(now, 'short');
    console.log('date ' + myFormattedDate);
    const localdate = new Date();
   // console.log('local date ' + localdate);

    let valued: any = false;
    if (this.question === '') {
    const src = $('#questionid').css('border-color', 'red');
      valued = true;
    } else {
     // #e6c1c7
      const src = $('#questionid').css('border-color', '#e6c1c7');
    }
    if (this.descrption === '' ) {
      const src = $('#descriptionid').css('border-color', 'red');
      valued = true;
    } else {
      const src = $('#descriptionid').css('border-color', '#e6c1c7');
    }
    if (this.tagslist.length === 0) {
      const src = $('#tagid').css('border-color', 'red');
      valued = true;
    } else {
      const src = $('#tagid').css('border-color', '#e6c1c7');
    }
    if (this.location === '') {
      const src = $('#locationid').css('border-color', 'red');
      valued = true;

    } else {
      const src = $('#locationid').css('border-color', '#e6c1c7');
    }
    if (valued === false) {
      try {
      // tslint:disable-next-line:prefer-const
     // let answers = new Array<Answers>();
       // tslint:disable-next-line:prefer-const
       let ans = new Answers();
       ans.setanswer('null');


      this.blogcreated = new Blog ();
      this.blogcreated.setcomments(0);
      this.blogcreated.setlocation(this.location);
     // this.blogcreated.settotalanswers(this.answerslist);
      this.blogcreated.setname(this.dataname);
      this.blogcreated.settags(this.tagslist);
      this.blogcreated.settopic(this.question);
      this.blogcreated.setdescription(this.descrption);

        this.blogcreated.date = myFormattedDate;

      this.shared.changeBlogger(this.blogcreated);
      this.insertblog.insertblog(this.blogcreated);
      this.router.navigateByUrl('/blog');
      } catch ( err ) {}

    }
  }
  logoutpressed() {
    console.log('logut pressed');

    this.storage.set('name', null);
    this.storage.set('email', null);
    this.router.navigateByUrl('/create-blog');

  }
  locationpressed() {
    // this.elRef.nativeElement.querySelector('.col-sm-4');
    // $(document).ready(function () {
   // const src = $('#questionid').css('border-color', 'red');

    // alert(src);
    // });
if (this.location === '') {

// this.maps = 'https://www.google.com/maps/embed/v1/place?q=' + 'kashmir Hwy, Islamabad, Islamabad Capital Territory, Pakistan' + this.map;
} else {
    this.maps =  'https://www.google.com/maps/embed/v1/place?q=' + this.location + this.map;
  this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.maps);
}
  }

  tagspressed() {
    let check  = true;
    for (let i = 0; i < this.tagslist.length ; i++) {
    //  console.log(this.tags + 'hi');
      if (this.tagslist[i] === this.tags || this.tags === '') {
        check = false;
      }
    }
    if (this.tags === '') {
      check = false;
    }
    if (check === true) {
      console.log(this.tags);
      this.tagslist.push(this.tags);
    }
    this.tags = '';
 // console.log(this.tags);

  }
}
