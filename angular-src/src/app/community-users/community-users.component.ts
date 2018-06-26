import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Discussion } from '../community-users/shared/discussion';
import 'rxjs/add/observable/interval';
import { Users } from '../community-users/shared/users';
import { UsersService } from '../community-users/users/users.service';
import { CommunityuserService } from '../community-users/communityuser.service';
import { Message } from './shared/message';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UpdateServiceService } from '../community-users/update-service.service';
import { DataserviceService } from '../community-users/dataservice.service';
import { ViewOnlyService } from './view-only.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GetuserinfoService } from '../community-users/getuserinfo.service';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.css'],
  animations: [
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class CommunityUsersComponent implements OnInit {
  question: string;
  // tslint:disable-next-line:no-inferrable-types
  itemCount: number = 4;
  // tslint:disable-next-line:no-inferrable-types
  btnText: string = 'Insert';
    // tslint:disable-next-line:no-inferrable-types
  goalText: string = '';
  username: string;
  goals = [];
  date: Date;
  Users: Users = <Users>{
    useremail: '140321@nu.edu.pk  ',
    username: 'umer'
  };
  DiscussionMessage: Message[] = [];

  mesagelist: Message = <Message>{

    answer: '',
    answer_useremail: 'khan',
    votes: ''
  };
  mesagelist2: Message = <Message>{

    answer: '',
    answer_useremail: 'bahadur',
    votes: ''
  };
  messages: Message[] = [];
  UsersShown: Users = <Users>{
  useremail: '',
  username: ''
  };
  Discussion: Discussion = <Discussion>{
    discussion_key: 'S39ahhy4YrpEjAFdmpv4',
    discussion_topic: 'hellome',
    discussion_email: 'umer@nu.edu.pk',
    discussion_question: 'what is pointer ? ',
    votes: '0',
    status: 'open'
  };
  UsersList: Users[] = [];
  DiscussionList: Discussion[] = [];
   showdiv = 0;
   itemsCollection_discussion: AngularFirestoreCollection<Discussion>;
  //  items_discussion: Observable<Discussion[]>;
   items_discussion: any = [];// Observable<Discussion[]>;
   itemDoc_discussion: AngularFirestoreDocument<Discussion>;
   items_users: any = [];// Observable<Discussion[]>;
   // private sub;
  //  value = 0;
   Useremail: string;
   Username: string;
   hide = false;
   ID: number;
  // tslint:disable-next-line:max-line-length
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private getinfoservice: GetuserinfoService,
    private updateservice: UpdateServiceService,
    private viewservice: ViewOnlyService,
    private route: ActivatedRoute,
    private router: Router,
    private _data: DataserviceService,
    af: AngularFirestore,
    private communityuserService: CommunityuserService,
    private userservice: UsersService
  ) {

    this.route.params.subscribe(res => (this.Useremail = res.id));
    this.messages.push(this.mesagelist);
    this.messages.push(this.mesagelist2);

    this.Discussion.messages = this.messages;

    /*this.sub = Observable.interval(10000)
    .subscribe((val) => { console.log('called'); });
*/
  // this.userservice.getuserData().then(list => this.UsersList = list);
   // this.communityuserService.getData();

    // this.communityuserService.adddiscussion(this.Discussion);
   // this.communityuserService.updatediscussion(this.Discussion);
// this.communityuserService.getData().then(list => this.DiscussionList = list);
    // this.getuserdiscussion();


   // this.communityuserService.adddiscussion(this.Discussion);
 //   console.log('userlist ' + this.UsersList.length + ' ' );
    this.getFromLocalemail('useremail');
    this.getFromLocalname('username');

}
  // onclicked() {
  //   this.value = 10;
  // }

  MessagessList: Message[] = [];
  discussionID: string;
  discussionQuestion: string;
  discussionTopic: string;
  discussionNumber: number;
  CommunityPage(userstring: any) {
  const id = userstring;
    // console.log('user string ' + id);
    // console.log('  tring  ' + this.DiscussionList[id].messages.length);

    this.ID = id;
    // this.router.navigateByUrl('/selected-discussion/' + userstring);
  //  this.router.navigateByUrl('/recipes-item');
    this.discussionQuestion = this.DiscussionList[userstring].discussion_question;
    this.discussionTopic = this.DiscussionList[userstring].discussion_topic;
    for (let i = 0; i < this.DiscussionList[userstring].messages.length; i++) {
      this.MessagessList.push(this.DiscussionList[userstring].messages[i]);
     console.log(this.DiscussionList[userstring].messages[i]);
    }
//    this.MessagessList = this.DiscussionList[userstring].messages;
  this.hide = true;
  }

showdata() {
    console.log('list ' + this.UsersList.length);
  }


  ngOnInit() {

    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;

    this._data.changeGoal(this.goals);
  }
  getuserdiscussion() {
    this.communityuserService.getDiscussionData(this.Useremail).then(list => this.DiscussionList = list);
    //  this.Useremail = 'umer@nu.edu.pk';
  }
  // overall questions
  viewAll() {
    console.log('view all');

    this.communityuserService.getData().then(list => this.DiscussionList = list);
  }
  // asked questions
  viewAsked() {
   // location.reload();
    console.log('view only');
   // this.Useremail = 'umer@nu.edu.pk';
    this.viewservice.getDiscussionData(this.Useremail).then(list => this.DiscussionList = list);
  }
  getFromLocalemail(key): void {
    console.log('==> recieved = key for name:' + key);
    this.Useremail = this.storage.get(key);
    console.log('get user email ' + this.Useremail);
    this.getinfoservice.getuserData(this.Useremail).then(list => this.UsersShown = list);
    console.log(' usere email ' + this.UsersShown.username);
  }
  getFromLocalname(key): void {
    console.log('recieved = key:' + key);
    this.username = this.storage.get(key);
    console.log('get user name ' + this.username);
   // this.getinfoservice.getuserData(this.username).then(list => this.UsersShown = list);
   //   console.log(' user email ' + this.UsersShown.username);
  }
  addItem() {
    /*this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
    */
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:label-position
    // this.Useremail = 'umer@nu.edu.pk';

    console.log(' data inserted ' + this.goalText);
    this.mesagelist.answer = this.goalText;
    this.mesagelist.answer_useremail = this.Useremail;
    this.MessagessList.push(this.mesagelist);
    this.DiscussionList[this.ID].messages.push(this.mesagelist);
    console.log(this.MessagessList.length);
    console.log(this.DiscussionList[this.ID]);
    this.updateservice.updatediscussion(this.DiscussionList[this.ID]);
  }
  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }

viewItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }
}
