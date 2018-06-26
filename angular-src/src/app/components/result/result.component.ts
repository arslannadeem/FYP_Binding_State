import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {

  questions: any;
  choices: any;
  data: any;

  wrong_question = [];
  final_question_of_artices = [];

  constructor(private router: Router,private quizService : QuizService, private flashMessgae: FlashMessagesService) 
  {}

  ngAfterViewInit() {
    this.ResultsHighlights();
  }

  final_list_of_articles = [];
  final_articles = [];
  View_result_array = [];
  view = false;
  show_data = [];

  final_show_questions = [];

  ngOnInit() {
    this.questions = JSON.parse(localStorage.getItem("question"));
    this.choices = JSON.parse(localStorage.getItem("choice"));
    this.data = JSON.parse(localStorage.getItem("data"));
  }

  ResultsHighlights() {
    
    for  (var j = 0; j < this.data.length; j++) {
      var question = document.getElementById(String(100 + j));
      var choice = question.getElementsByTagName("div");

      let index = -1;
      for (var k = 0; k < choice.length; k++) {
        if (this.data[j].Choices[k].Status) {
          index = k;
          k = choice.length;
        }
      }

      if (this.choices[j] == index) {
        console.log("Question true");
        var statement = document.getElementById(String(100 + j));
        statement.getElementsByClassName(String(j))[index].className += " " + 'correct';
        index = -1;
      }
      else {
        console.log("Question false");

        if (index != -1) {

          this.wrong_question.push(this.questions[j]);

          var statement = document.getElementById(String(100 + j));
          statement.getElementsByClassName(String(j))[this.choices[j]].className += " " + 'wrong';
          statement.getElementsByClassName(String(j))[index].className += " " + 'correct_with_wrong';
          index = -1;
        }
      }
    }

    var select_question = [];

    for(var i=0;i<this.wrong_question.length;i++)
    {
        select_question[i] = this.data[this.wrong_question[i]];
    }

    if(this.wrong_question.length>0)
    {
      this.quizService.getArticleByWrongQuestion(select_question).subscribe(data => {
        if (data.success) {

          var list = data.articles;

          // ----- if duplicate articles then remove it --------

          for(var i=0;i<list.length-1;i++)
          {
            for(var j=i+1;j<list.length;j++)
            {
              if(list[i].Topic_Name==list[j].Topic_Name && list[i].Sub_Topic_Name==list[j].Sub_Topic_Name
              && list[i].Description==list[j].Description)
              {
                if(list[j]._id!=-1 && list[i]._id!=-1)
                {
                  // if(list[i]._id == list[j]._id)
                    list[j]._id=-1;
                }
              }
            }
          }

          // ----------- save it other array -------
          
          for(var i=0,j=0;i<list.length;i++)
          {
            if(list[i]._id!=-1)
            {
              this.final_list_of_articles[j]=list[i];
              j++;
            }
          }

          var find = false;
          var l=0;
          
          var final_articles = [];
          for(var i=0;i<select_question.length;i++)
          {
              //select_question[i] = this.data[this.wrong_question[i]];
              for(var j=0;j<select_question[i].Sub_Topic_Name.length;j++)
              {
                  for(var k=0;k<this.final_list_of_articles.length;k++)
                  {
                    if(select_question[i].Sub_Topic_Name[j]==this.final_list_of_articles[k].Sub_Topic_Name)
                    {
                      final_articles.push(this.final_list_of_articles[k].Description);
                    }
                  }
              }
              this.final_question_of_artices.push(final_articles);
              final_articles = [];
          }


          this.final_show_questions = select_question;

          console.log("------------ Result --------------")

          console.log(this.final_show_questions)
         console.log(this.final_question_of_artices)
         console.log(this.final_list_of_articles)

          console.log("------------ Result --------------")

          this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
        }
        else {
          this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }

  ShowArticles()
  {
      this.view = true;

      for(var i=0;i<this.final_question_of_artices.length;i++)
      {
          //this.View_result_array[i] = {"Question":this.data[this.questions[i]].Description,"Description": String(this.final_question_of_artices[i]) };
          this.View_result_array[i] = {"Question":this.final_show_questions[i].Description,"Description": String(this.final_question_of_artices[i]) };
      }
  }
}