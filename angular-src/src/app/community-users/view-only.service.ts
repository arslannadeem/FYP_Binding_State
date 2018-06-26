import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Discussion } from '../community-users/shared/discussion';
import { Message } from '../community-users/shared/message';

@Injectable()
export class ViewOnlyService {
  itemsCollection_users: AngularFirestoreCollection<Discussion>;
  items_users: any = [];// Observable<Discussion[]>;
  itemDoc_users: AngularFirestoreDocument<Discussion>;
  mesagelist: Message = <Message>{
    answer: '',
    answer_useremail: '',
    votes: ''
  };
  messages: Message[] = [];
  DicussionList: Discussion[] = [];
  Discussion: Discussion = <Discussion>{
    discussion_key: '',
    discussion_topic: '',
    discussion_email: '',
    votes: '',
  };
  User_DiscussionEmail: string;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection_users = this.afs.collection('discussion', ref => ref.orderBy('votes', 'asc'));
    this.items_users = this.itemsCollection_users.valueChanges();

    this.messages.push(this.mesagelist);
    this.Discussion.messages = this.messages;


    this.items_users = this.itemsCollection_users.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Discussion;
        data.discussion_key = a.payload.doc.id;
        return data;
      });
    });
  }
  async getTopics_Questions(Userid: string): Promise<Discussion> {
    //  this.items_users.subscribe(data => console.log(data));
    await this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          //   console.log(data[i]);
          const UserTemp: Discussion = <Discussion>{
          };
          UserTemp.discussion_key = data[i].discussion_key;
          UserTemp.discussion_topic = data[i].discussion_topic;
          UserTemp.discussion_email = data[i].discussion_email;
          UserTemp.discussion_question = data[i].discussion_question;
          UserTemp.votes = data[i].votes;

          if (UserTemp.discussion_key === Userid) {
            // this.updatediscussion(UserTemp);
            // console.log('Show data ' + UserTemp.discussion_key + ' ' + UserTemp.discussion_email + ' ' + UserTemp.discussion_topic);
            this.Discussion = UserTemp;
            return this.Discussion;
          }
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].discussion_key = '';
          data[i].discussion_topic = '';
          data[i].votes = '';


        }
        return this.Discussion;
      }
      // delay(1000);
    });
    //  console.log('yes');
    return this.Discussion;

  }

  getTopic(Userid: string) {
    //  this.items_users.subscribe(data => console.log(data));
    this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          const UserTemp: Discussion = <Discussion>{
          };
          UserTemp.discussion_key = data[i].discussion_key;
          UserTemp.discussion_topic = data[i].discussion_topic;
          UserTemp.discussion_email = data[i].discussion_email;
          UserTemp.discussion_question = data[i].discussion_question;
          UserTemp.votes = data[i].votes;

          if (UserTemp.discussion_key === Userid) {
            // this.updatediscussion(UserTemp);
            console.log('Show data ' + UserTemp.discussion_key + ' ' + UserTemp.discussion_email + ' ' + UserTemp.discussion_topic);

            return UserTemp;
          }
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].discussion_key = '';
          data[i].discussion_topic = '';
          data[i].votes = '';


        }

      }
      // delay(1000);
    });
    //  console.log('yes');
    return this.Discussion;

  }
  async getDiscussionData(Userid: string): Promise<Discussion[]> {
    //  this.items_users.subscribe(data => console.log(data));
    await this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          const UserTemp: Discussion = <Discussion>{
          };
          UserTemp.discussion_key = data[i].discussion_key;
          UserTemp.discussion_topic = data[i].discussion_topic;
          UserTemp.discussion_email = data[i].discussion_email;
          UserTemp.discussion_question = data[i].discussion_question;
          UserTemp.status = data[i].status;
          UserTemp.username = data[i].username;
          UserTemp.votes = data[i].votes;
          UserTemp.messages = data[i].messages;
          // tslint:disable-next-line:max-line-length
          console.log('Show data from ' + UserTemp.discussion_key + ' ' + Userid);
          // tslint:disable-next-line:prefer-const
          // tslint:disable-next-line:no-var-keyword
          var useremail1 = UserTemp.discussion_email.toLocaleLowerCase.toString();
            // tslint:disable-next-line:prefer-const
          // tslint:disable-next-line:no-var-keyword
          var useremail2 = Userid.toLocaleLowerCase.toString();

          if (useremail1.toLocaleLowerCase.toString() === useremail2.toLocaleLowerCase.toString() && UserTemp.status === 'open')  {
            // this.updatediscussion(UserTemp);
            console.log('Show data from ' + UserTemp.discussion_key + ' ' + Userid);

            this.DicussionList.push(UserTemp);
          }
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].discussion_key = '';
          data[i].discussion_topic = '';
          data[i].votes = '';


        }
        return this.DicussionList;
      }
      // delay(1000);
    });
    //  console.log('yes');
    return this.DicussionList;

  }
  async getData(): Promise<Discussion[]> {
    this.items_users.subscribe(data => console.log(data));
    await this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          const UserTemp: Discussion = <Discussion>{
          };
          UserTemp.discussion_key = data[i].discussion_key;
          UserTemp.discussion_topic = data[i].discussion_topic;
          UserTemp.discussion_email = data[i].discussion_email;
          UserTemp.discussion_question = data[i].discussion_question;
          UserTemp.votes = data[i].votes;
          UserTemp.messages = data[i].messages;

            this.DicussionList.push(UserTemp);
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].discussion_key = '';
          data[i].discussion_topic = '';
          data[i].votes = '';


        }
        return this.DicussionList;
      }
      // delay(1000);
    });
    //  console.log('yes');
    return this.DicussionList;

  }
  adddiscussion(item: Discussion) {
    this.itemsCollection_users.add(item);
    // const id = this.afs.createId();
    // console.log('id   ' + id);

    item.discussion_key = this.itemsCollection_users.ref.id;
  }
  deletediscussion(item: Discussion) {
    this.itemDoc_users = this.afs.doc(`discussion/${item.discussion_key}`);
    this.itemDoc_users.delete();
  }

  updatediscussion(item: Discussion) {
    this.itemDoc_users = this.afs.doc(`discussion/${item.discussion_key}`);
    try {
      this.itemDoc_users.update(item);
    } catch (error) {
      console.log('error ' + error);
    }

  }
}
