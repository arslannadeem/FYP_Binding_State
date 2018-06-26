import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class QuizService {

  authToken : any;
  data : any;
  constructor(private http : Http) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

    //-------------------- Add New Question ---------------- ok

    add_New_Quiz_Questions()
    {
      console.log('Quiz Service')
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/question/newQuestion',{headers : headers})
      .map(res => {
        return res.json();
      })
    }

    //----------- extra ---------

  // getQuizDatas()
  // {
  //   console.log('Quiz Service')
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization',this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://localhost:3000/question/getAllQuestion',{headers : headers})
  //   .map(res => {
  //     return res.json();
  //   })
  // }

  

  getQuizData(course : any , topic : any)
  {
    console.log("inside service");
    
    this.data = {"course" : course , "topic" : topic};

    console.log('Quiz Service')
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/question/getAllQuestionsByData',(this.data),{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  getArticleByWrongQuestion(list : any)
  {    
    console.log('Quiz Service')
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/article/getArticleByWrongQuestion',({"data" : list}),{headers : headers})
    .map(res => {
      return res.json();
    })
  }
}