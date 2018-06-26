import { Injectable } from '@angular/core';
import { Answers } from '../models/answers';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { Blog } from '../models/blog';

@Injectable()
export class InsertanswerService {
  private dbPath = '/answers';
  bloggerRef: AngularFireList<Answers> = null;
  constructor(private db: AngularFireDatabase) {
    this.bloggerRef = db.list(this.dbPath);
  }
  insertblog(answer: Answers) {
    let list: any;
    // console.log(blogger);

    forkJoin(
      list = this.bloggerRef.push(answer));
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
