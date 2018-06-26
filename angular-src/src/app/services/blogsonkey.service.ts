import { Injectable } from '@angular/core';
import { Answers } from '../models/answers';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { Blog } from '../models/blog';

@Injectable()
export class BlogsonkeyService {
  key: string;
  private dbPath = '/answers';
  private answers: Array<Answers>;
  bloggerRef: AngularFireList<Answers> = null;
  constructor(private db: AngularFireDatabase) {
    this.answers = new Array<Answers>();
    this.key = '';
    this.bloggerRef = db.list(this.dbPath);

  }
  getanswers(): void {

  }
  getanswersonkey(k: string): Answers[] {
    this.key = k;
    let list: any;
  //  this.bloglist = new Array<Answers>();
    list = this.bloggerRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(bloggers => {
      console.log(bloggers.length);
      // tslint:disable-next-line:prefer-const
      // let blog = new Blog();
      for (let i = 0; i < bloggers.length; i++) {
        // console.log('answers ' + bloggers[i].answer);

        if (bloggers[i].blogkey === this.key) {
          console.log('answers ' + bloggers[i].answer);

        // tslint:disable-next-line:prefer-const
        let blog = new Answers();
        // blogger = bloggers[i];
        blog.setkey(bloggers[i].key);
        blog.setblogkey(bloggers[i].blogkey);
        blog.setdate(bloggers[i].date);
        blog.setemail(bloggers[i].email);
        blog.setname(bloggers[i].name);
          blog.setanswer(bloggers[i].answer);


          this.answers.push(blog);
        }
      }
    });
    console.log('list ' + list);

    try {
      forkJoin([list]).subscribe(results => {
        //  console.log('hi');
        console.log('fork join ' + results);

      });
    } catch (err) {

    }
    finally {

    }
    return this.answers;
  }

}
