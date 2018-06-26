import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ArticleService } from '../../services/article.service';
import { QuizService } from '../../services/quiz.service';
import {FlashMessagesService} from 'angular2-flash-messages';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private courseService : CourseService, 
    private questionService : QuizService, 
    private router:Router,
    private flashMessgae : FlashMessagesService
  ) { }

  ngOnInit() {
    //  Register User
  //   this.courseService.addCourseData().subscribe(data => {
  //     if(data.success)
  //     {
  //       this.flashMessgae.show("Your Course is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
  //       //this.router.navigate(['/login']);
  //     }
  //     else
  //     {
  //       this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
  //       //this.router.navigate(['/register']);
  //     }
  // });

  // this.courseService.addCourseData().subscribe(data=>{
  //   if(data.success)
  //       {
  //         this.flashMessgae.show("Your Course is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
  //         //this.router.navigate(['/login']);
  //       }
  //       else
  //       {
  //         this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
  //         //this.router.navigate(['/register']);
  //       }
  // });

  // this.articleService.addArticleData().subscribe(data=>{
  //   if(data.success)
  //       {
  //         this.flashMessgae.show("Your Article is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
  //         //this.router.navigate(['/login']);
  //       }
  //       else
  //       {
  //         this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
  //         //this.router.navigate(['/register']);
  //       }
  // });

  // this.questionService.addQuizData().subscribe(data=>{
  //   if(data.success)
  //       {
  //         this.flashMessgae.show("Your Queztion is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
  //         //this.router.navigate(['/login']);
  //       }
  //       else
  //       {
  //         this.flashMessgae.show("Something Data went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
  //         //this.router.navigate(['/register']);
  //       }
  // });
  }
}
