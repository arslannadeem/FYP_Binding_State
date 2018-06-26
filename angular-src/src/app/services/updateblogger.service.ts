import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { Blogger } from '../models/blogger';


@Injectable()
export class UpdatebloggerService {
    private dbPath = '/bloggers';
   bloggerRef: AngularFireList<Blogger> = null;
  constructor(private db: AngularFireDatabase) {
     this.bloggerRef = db.list(this.dbPath);

  }
  updateblogger(blogger: Blogger, value: any): Boolean {
    let bloggerexists = false;
    this.bloggerRef.snapshotChanges().map(changes => {
       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     }).subscribe(bloggers => {

        for (let i = 0 ; i < bloggers.length ; i++ ) {
            if (bloggers[i].email === blogger.getemail()) {
              bloggerexists = true;
              blogger.setkey(bloggers[i].key);
              this.bloggerRef.update(blogger.getkey(), value).catch(error => this.handleError(error));
             }
        }
      if (bloggerexists === false ) {
        this.bloggerRef.push(blogger);
        return true;
      } else {
      return false;
      }
      });

    return false;
  }
  private handleError(error) {
    console.log(error);
  }
}
