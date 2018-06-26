import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Blogger } from '../models/blogger';
import { Blog } from '../models/blog';


@Injectable()
export class SharedserviceService {

  // private messageSource;
  // currentMessage = this.messageSource.asObservable();
  private blog: Blog;
  constructor() {
    this.blog = new Blog();
   // this.messageSource = new BehaviorSubject<Blog>(this.blog);

   }
  changeBlogger(blog: Blog) {
    this.blog = blog;
  }
  getblog(): Blog {
    return this.blog;
  }
}
