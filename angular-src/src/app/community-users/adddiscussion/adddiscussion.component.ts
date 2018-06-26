import { Component, OnInit, Inject } from '@angular/core';
import { Users } from '../shared/users';
import { Discussion } from '../shared/discussion';
import { AddQuestionService } from '../add-question.service';
import { Message } from '../shared/message';
import { ActivatedRoute, Router } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-adddiscussion',
  templateUrl: './adddiscussion.component.html',
  styleUrls: ['./adddiscussion.component.css']
})
export class AdddiscussionComponent implements OnInit {
  messagelist: Message = <Message>{
   answer: '',
   answer_useremail: '',
   votes: '',
 };
 userdata: Users = <Users>{
  useremail: '',
  username: ''

 };
  messages: Message[] = [];

  Discussion: Discussion = <Discussion>{
    discussion_key: '',
    discussion_topic: '',
    discussion_email: '140170@nu.edu.pk',
    discussion_question: '',
    username: 'junaid',
    votes: '0',
    status: 'open'
  };

  // tslint:disable-next-line:no-inferrable-types
  topic: string = '';
  // tslint:disable-next-line:no-inferrable-types
  question: string = '';

  constructor(private AddQuestion: AddQuestionService, private route: ActivatedRoute,
    private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService ) {
    this.messages.push(this.messagelist);
    this.Discussion.messages = this.messages;
    this.getFromLocaluseremail('useremail');

    this.getFromLocalusername('username');
  }

  ngOnInit() {
  }

  getFromLocalusername(key): void {
    // console.log('recieved = key:' + key);
    // this.Useremail = this.storage.get(key);
    // console.log('get user email ' + this.Useremail);
    // this.getinfoservice.getuserData(this.Useremail).then(list => this.UsersShown = list);
     this.userdata.username = this.storage.get(key);
    console.log(' user name ' + this.userdata.username);
  }
  getFromLocaluseremail(key): void {
    // console.log('recieved = key:' + key);
    // this.Useremail = this.storage.get(key);
    // console.log('get user email ' + this.Useremail);
    // this.getinfoservice.getuserData(this.Useremail).then(list => this.UsersShown = list);
    this.userdata.useremail = this.storage.get(key);
    console.log(' user email ' + this.userdata.useremail);
    // this.userdata.useremail = this.storage.get(key);

  }
  addquestions() {
    if (this.topic !== '' && this.question !== '') {
    // this.Discussion.discussion_email = '';
     this.Discussion.discussion_question = this.question;
     this.Discussion.discussion_topic = this.topic;
     this.Discussion.username = this.userdata.username;
      this.Discussion.discussion_email = this.userdata.useremail;

     this.AddQuestion.adddiscussion(this.Discussion);
     this.AddQuestion.getDiscussionData(this.Discussion.discussion_email);
      // this.saveInLocal('useremail', this.Discussion.discussion_email);
      // this.saveInLocal('username', this.Discussion.username);


    } else {
    }
  }
  // saveInLocal(key, val): void {
  //   console.log('==> recieved= key:' + key + 'value:' + val);
  //   this.storage.set(key, val);
  //    // this.data[key] = this.storage.get(key);

  // }
  CommunityPage() {
    this.router.navigateByUrl('/community-users');
    // this.saveInLocal('useremail', this.Discussion.discussion_email);

  }
}
