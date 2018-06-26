import { Injectable } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import { Blog } from '../models/blog';

@Injectable()
export class BlogdataService {
  private bloglist: Array<Blog>;
  private dbPath = '/blog';
  bloggerRef: AngularFireList<Blog> = null;
  constructor(private db: AngularFireDatabase) {
    this.bloggerRef = db.list(this.dbPath);
    this.bloglist = new Array<Blog>();
    this.getallblog();
  }

  getallblog(): void {
    // console.log('in get all bloggers ');

    // tslint:disable-next-line:prefer-const
    let list: any;

    list = this.bloggerRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(bloggers => {
      console.log(bloggers.length);
      // tslint:disable-next-line:prefer-const
     // let blog = new Blog();
      for (let i = 0; i < bloggers.length; i++) {
        console.log('bloggers ' + bloggers[i].name);

        // tslint:disable-next-line:prefer-const
        let blog = new Blog();
        // blogger = bloggers[i];
        blog.setkey(bloggers[i].key);
        blog.setname(bloggers[i].name);
        blog.setdescription(bloggers[i].description);
        blog.settags(bloggers[i].tags);
        blog.settopic(bloggers[i].topics);
        blog.setdate(bloggers[i].date);
      //  blog.settotalanswers(bloggers[i].answers);
        blog.setlocation(bloggers[i].location);
        blog.setcomments(bloggers[i].comments);


        this.bloglist.push(blog);
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
  }

  getdata(): Blog[] {

    return this.bloglist;
  }
}
