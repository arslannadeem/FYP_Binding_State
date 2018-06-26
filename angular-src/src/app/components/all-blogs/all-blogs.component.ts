import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
import { BlogsonkeyService } from '../../services/blogsonkey.service';
import { DatePipe } from '@angular/common';
import { SharedserviceService } from '../../services/sharedservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  providers: [DatePipe]
})
export class AllBlogsComponent implements OnInit {
  blogslist: Array<Blog>;
  allblogslist: Array<Blog>;
  blogcreated: Blog;
  size: number;
  constructor(private blogs: BlogsService, private blogskey: BlogsonkeyService, private date: DatePipe,
    private shared: SharedserviceService, private route: ActivatedRoute, private router: Router) {
    this.size = 0;
    this.allblogslist = new Array<Blog>();
    this.blogslist = new Array<Blog>();
    this.blogslist = this.blogs.getallblog();
    // if (this.allblogslist.length > 0 && this.allblogslist.length % 3 === 0) {

    // }
    this.blogcreated = new Blog();
   }

  ngOnInit() {
    // this.router.navigateByUrl('/all-bogs' ) 
  }
  BlogSelected(key: string) {
    console.log(key);
    this.blogskey.key = "";
    this.blogcreated.setkey("");
    this.blogcreated.date = "";
for (let i = 0 ; i < this.blogslist.length; i++ ) {
  if (this.blogslist[i].key === key ) {
    this.blogskey.key = key;
   // this.blogskey.getanswersonkey(key);
    this.blogcreated = new Blog();
    this.blogcreated.setkey(this.blogskey.key);
    this.blogcreated.setcomments(this.blogslist[i].comments);
    this.blogcreated.setlocation(this.blogslist[i].location);
    // this.blogcreated.settotalanswers(this.answerslist);
    this.blogcreated.setname(this.blogslist[i].name);
    this.blogcreated.settags(this.blogslist[i].tags);
    this.blogcreated.settopic(this.blogslist[i].topic);
    this.blogcreated.setdescription(this.blogslist[i].description);
  //  this.date = new DatePipe('en-Us');
    // const now = Date.now();
  //  const myFormattedDate = this.date.transform(now, 'short');
  //  console.log('date ' + myFormattedDate);
   // const localdate = new Date();
    this.blogcreated.date = this.blogslist[i].date;
    this.shared.changeBlogger(this.blogcreated);
    this.router.navigateByUrl('/selectedblog');
    break;

  }
}
    console.log('key ' + key);

  }
}
