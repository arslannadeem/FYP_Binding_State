import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var $: any;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  course: any;
  topic: any;

  index = 0;
  quiz_each_question: any;
  quiz_data: any;

  question = [];
  choice = [];

  final_question = [];
  final_choice = [];

  constructor(private dataService: DataService, private quizService: QuizService, private router: Router, private flashMessgae: FlashMessagesService) { }

  ngOnInit() {

    this.course = this.dataService.course;
    this.topic = this.dataService.topic;

    console.log("course", this.course)
    console.log("topic", this.topic)

    // --------------- Add New Questions -------------- ok 

    // this.quizService.add_New_Quiz_Questions().subscribe(data => {
    //   if(data.success)
    //       {
    //         this.flashMessgae.show("Your Questions is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
    //         //this.router.navigate(['/login']);
    //       }
    //       else
    //       {
    //         this.flashMessgae.show("Something went Wrong Questions",{cssClass : 'alert-danger', timeout : 3000});    
    //         //this.router.navigate(['/register']);
    //       }
    // });

    // --------------- Get Quiz Data ---------------

    this.quizService.getQuizData(this.dataService.course, this.dataService.topic).subscribe(list => {
      this.quiz_data = list.data;
      console.log("uiz Data ", list.data);
    });
  }

  SaveResult(question_id: number, choice_id: number) {
    //console.log({"question_id " : question_id,"choice_id " : choice_id});

    this.question[this.index] = question_id;
    this.choice[this.index] = choice_id;

    this.index++;
  }

  CalculatingResult = function () {
    let count = 0;
    let last = 0;
    let k = 0;
    let size = this.question.length;

    console.log(this.question);

    for (var i = 0; i < size; i++) {
      for (var j = i + 1; j < size; j++) {
        if (this.question[i] == this.question[j] && this.question[i] != -1) {
          count++;
          last = j;
        }
      }
      if (count == 0) {
        if (this.question[i] != -1) {
          this.final_question[k] = this.question[i];
          this.final_choice[k] = this.choice[i];
          this.question[i] = -1;
        }
      }
      else {
        if (this.question[last] != -1) {
          this.final_question[k] = this.question[last];
          this.final_choice[k] = this.choice[last];
          this.question[last] = -1;
        }
      }
      k++;
      last = 0;
      count = 0;
    }

    // // console.log("-------------------------");

    // console.log(this.final_question);
    // console.log(this.final_choice);
    // console.log(this.quiz_data);

    // // console.log("-------------------------");

    localStorage.setItem("question", JSON.stringify(this.final_question));
    localStorage.setItem("choice", JSON.stringify(this.final_choice));

    localStorage.setItem("data", JSON.stringify(this.quiz_data));

    this.router.navigate(['/result']);
  }

}