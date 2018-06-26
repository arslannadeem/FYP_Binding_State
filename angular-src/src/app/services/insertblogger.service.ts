import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Blogger } from '../models/blogger';
import { Observable } from 'rxjs/observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
// import { } 'rxjs/add/observable/forkJoin';


@Injectable()
export class InsertbloggerService {
 public inserted: any = false;
  private dbPath = '/bloggers';
  bloggerRef: AngularFireList<Blogger> = null;
  constructor(private db: AngularFireDatabase) {
  this.bloggerRef = db.list(this.dbPath);
  }
  createBlogger(blogger: Blogger) {
    let list: any;
   // console.log(blogger);

    forkJoin(
    list =  this.bloggerRef.push(blogger));
      try {
      forkJoin([list]).subscribe(results => {
      //  console.log('hi');
        console.log('fork join ' + results);
        this.inserted = true;
      });
    } catch (err) {

    }
    finally {

    }
   // console.log('hello');
    return forkJoin(list);

  }
}
