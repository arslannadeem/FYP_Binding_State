import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UpdateblogService {

  [x: string]: any;
  private dbPath = '/blog';
  bloggerRef: AngularFireList<Blog> = null;
  constructor(private db: AngularFireDatabase) {
    this.bloggerRef = db.list(this.dbPath);

  }
  updateblogger(blog: string, value: any) {
    this.bloggerRef.update(blog, value).catch(error => this.handleError(error));
  }
}
