import { Injectable } from '@angular/core';
import { Blogger } from '../models/blogger';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';

@Injectable()
export class BloggerslistService {
  private dbPath = '/bloggers';
  bloggerRef: AngularFireList<Blogger> = null;
  bloggerlist: Array<Blogger>;
  constructor(private db: AngularFireDatabase) {
  this.bloggerRef = db.list(this.dbPath);
  this.bloggerlist = new Array<Blogger>();
  this.bloggerlist.length = 0;
  this.getallbloggers();
   }

   getallbloggers(): void {
    // console.log('in get all bloggers ');

    // tslint:disable-next-line:prefer-const
    let list: any;

     list =  this.bloggerRef.snapshotChanges().map(changes => {
       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     }).subscribe(bloggers => {
console.log(bloggers.length);
      // tslint:disable-next-line:prefer-const
      let blogger = new Blogger();
       for (let i = 0; i < bloggers.length; i++) {
        // blogger = bloggers[i];
         blogger.setkey(bloggers[i].key);
         blogger.setemail(bloggers[i].email);
         blogger.setname(bloggers[i].name);
         blogger.setpassword(bloggers[i].password);
 //        blogger.setlocation(bloggers[i].location);
         this.bloggerlist.push(blogger);
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

   getdata(): Blogger[] {

    return this.bloggerlist;
   }
}
