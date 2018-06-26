import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Users } from './shared/users';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetuserinfoService {
  UsersList: Users[] = [];
  itemsCollection_users: AngularFirestoreCollection<Users>;
  items_users: any = [];// Observable<Discussion[]>;
  itemDoc_users: AngularFirestoreDocument<Users>;
  Discussion: Users = <Users>{
    useremail: '',
    username: ''
  };
  constructor(public afs: AngularFirestore) {
    this.itemsCollection_users = this.afs.collection('users', ref => ref.orderBy('useremail', 'asc'));
    this.items_users = this.itemsCollection_users.valueChanges();
  }

  async checkuserData(userid: string): Promise<Boolean> {
    //  console.log('userlist ' + this.UsersList.length ); //+ ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
    //  return this.UsersList;
    await this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          const UserTemp: Users = <Users>{
          };

          UserTemp.useremail = data[i].useremail;
          UserTemp.username = data[i].username;
          console.log(' show Users ' + UserTemp.username + ' ' + userid + ' ' + UserTemp.useremail);
          const user1 = userid.toString();
          const user2 = UserTemp.useremail.toString();

          if (user1.toLowerCase.toString() === user2.toLowerCase.toString()) {
            console.log(' found ' + UserTemp.useremail);
            return true;
          }
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].useremail = '';
          data[i].username = '';
        }
        return false;
      }
      // delay(1000);
    });
    //  console.log('yes');
    return false;
  }

  async getuserData(userid: string): Promise<Users> {
    //  console.log('userlist ' + this.UsersList.length ); //+ ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
    //  return this.UsersList;
    await this.items_users.subscribe(data => {
      if (data.length <= 0) {
      } else {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          const UserTemp: Users = <Users>{
          };

          UserTemp.useremail = data[i].useremail;
          UserTemp.username = data[i].username;
          console.log(' show Users ' + UserTemp.username + ' ' + userid + ' ' + UserTemp.useremail);
          const user1 = userid.toString();
          const user2 = UserTemp.useremail.toString();

          if (user1.toLowerCase.toString() === user2.toLowerCase.toString()) {
            console.log(' found ' + UserTemp.useremail);
          return UserTemp;
          }
          // tslint:disable-next-line:max-line-length
          // console.log('userlist ' + this.UsersList.length + ' ' + this.UsersList[0].useremail + ' ' + this.UsersList[0].username);
          data[i].useremail = '';
          data[i].username = '';
        }
        return this.Discussion;
      }
      // delay(1000);
    });
    //  console.log('yes');
    return this.Discussion;
  }
  adduser(item: Users) {
    this.itemsCollection_users.add(item);
  }
  deleteuser(item: Users) {
    this.itemDoc_users = this.afs.doc(`users/${item.useremail}`);
    this.itemDoc_users.delete();
  }
  updateuser(item: Users) {
    this.itemDoc_users = this.afs.doc(`users/${item.useremail}`);
    this.itemDoc_users.update(item);
  }
}
