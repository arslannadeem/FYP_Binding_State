import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';


import {ValidateService} from './services/validate.service'
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {CourseService} from './services/course.service';
import {QuizService} from './services/quiz.service';
import {DataService} from './services/data.service';
import {ArticleService} from './services/article.service';
import {ModifyTopicService} from './services/modify-topic.service';
import {ModifyQuestionService} from './services/modify-question.service';

import { CoursesComponent } from './components/courses/courses.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { ModifyTopicComponent } from './components/modify-topic/modify-topic.component';
import { ModifyQuestionComponent } from './components/modify-question/modify-question.component';

//------------------------------

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
// import { EmployeesComponent } from './employees/employees.component';
// import { EmployeComponent } from './employees/employe/employe.component';
// import { EmployeService } from './employees/shared/employe.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { CommunityUsersComponent } from './community-users/community-users.component';
import { CommunityuserService } from './community-users/communityuser.service';
import { UsersService } from './community-users/users/users.service';
import { DataserviceService } from './community-users/dataservice.service';
import { ViewOnlyService } from './community-users/view-only.service';
import { UpdateServiceService } from './community-users/update-service.service';
import { AdddiscussionComponent } from './community-users/adddiscussion/adddiscussion.component';
import { UserLoginComponent } from './community-users/adddiscussion/user-login.component';
import { AddQuestionService } from './community-users/add-question.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { GetuserinfoService } from './community-users/getuserinfo.service';
import { AdduserdataService } from './community-users/users/adduserdata.service';

import { DatePipe } from '@angular/common';

import { BloggerslistService } from './services/bloggerslist.service';
import { CreatedBlogComponent } from './components/created-blog/created-blog.component';
import { SharedserviceService } from './services/sharedservice.service';
import { InsertblogService } from './services/insertblog.service';
import { UpdateblogService } from './services/updateblog.service';
import { InsertanswerService } from './services/insertanswer.service';
import { BlogdataService } from './services/blogdata.service';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { BlogsService } from './services/blogs.service';
import { SeletedblogComponent } from './components/seletedblog/seletedblog.component';
import { BlogsonkeyService } from './services/blogsonkey.service';
import { BlogComponent } from './components/blog/blog.component';
import { Pipe, PipeTransform } from '@angular/core';
import { InsertbloggerService } from './services/insertblogger.service';
import { UpdatebloggerService } from './services/updateblogger.service';
import { DeletebloggerService } from './services/deleteblogger.service';



const appRoutes : Routes = [
  {path: '', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  {path: 'profile', component : ProfileComponent,canActivate:[AuthGuard]},
  {path: 'courses',component : CoursesComponent},
  {path: 'quiz',component : QuizComponent},
  {path: 'result',component : ResultComponent},
  {path: 'modify-topic',component : ModifyTopicComponent},
  {path: 'modify-question',component : ModifyQuestionComponent},
  // { path: '', redirectTo: 'add-discussion', pathMatch: 'full' },
  { path: 'all-bogs', component: AllBlogsComponent },
  { path: 'create-blog', component: BlogComponent },
  { path: 'blog', component: CreatedBlogComponent },
  { path: 'allblogs', component: AllBlogsComponent },
 { path: 'selectedblog', component: SeletedblogComponent }
  // { path: 'add-discussion', component: AdddiscussionComponent },
  // { path: 'user-login', component: UserLoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CoursesComponent,
    QuizComponent,
    ResultComponent,
    ModifyTopicComponent,
    ModifyQuestionComponent,
    CommunityUsersComponent,
    // SelectedDiscussionComponent,
    AdddiscussionComponent,
    UserLoginComponent,
    AllBlogsComponent,
    BlogComponent,
    CreatedBlogComponent,
    AllBlogsComponent,
    SeletedblogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    // routing,
    StorageServiceModule
    //
    
  ],
  providers: [ValidateService,AuthService,AuthGuard,CourseService,
              QuizService,DataService,ArticleService,ModifyTopicService,ModifyQuestionService,
              GetuserinfoService, AngularFirestore,AdduserdataService, CommunityuserService, UsersService, DataserviceService, ViewOnlyService, UpdateServiceService, AddQuestionService,
              InsertbloggerService, UpdatebloggerService, InsertblogService,
              DeletebloggerService, BloggerslistService, SharedserviceService, UpdateblogService, InsertanswerService,
              BlogdataService, BlogsService, BlogsonkeyService],
  bootstrap: [AppComponent]
})
export class AppModule { }