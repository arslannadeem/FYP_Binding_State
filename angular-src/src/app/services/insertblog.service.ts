import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
@Injectable()
export class InsertblogService {

  private dbPath = '/blog';
  bloggerRef: AngularFireList<Blog> = null;
  constructor(private db: AngularFireDatabase) {
    this.bloggerRef = db.list(this.dbPath);
  }
  insertblog(blog: Blog) {
    let list: any;
    // console.log(blogger);

    forkJoin(
      list = this.bloggerRef.push(blog));
    try {
      forkJoin([list]).subscribe(results => {
        //  console.log('hi');
     //   console.log('fork join ' + results);
     //   this.inserted = true;
      });
    } catch (err) {

    }
    finally {

    }
    // console.log('hello');
    return forkJoin(list);

  }
}
