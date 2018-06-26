import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthConfig, tokenNotExpired } from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()

export class ModifyQuestionService {

  constructor(private http: Http) { }

  authToken: any;

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  Get_Heading_By_Crawling_Tutorial(value: any) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log("service")
    console.log(value);
    return this.http.post('http://localhost:3000/modify-question/Articles_tutorial_point', { "web": value }, { headers: headers })
      .map(res => {
        console.log("Articles Tutorial Point Service");
        return res.json();
      });
  }

  Get_Heading_By_Crawling_JavaTPoint(value: any) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log("service")
    console.log(value);
    return this.http.post('http://localhost:3000/modify-question/Articles_javat_point', { "web": value }, { headers: headers })
      .map(res => {
        console.log("Articles JavaTPoint Service");
        return res.json();
      });
  }

  Add_New_Questions_With_Choices(value: any) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/question/New_Question', { "data": value }, { headers: headers })
      .map(res => {
        console.log("Question Added Sucessfully");
        return res.json();
      });
  }

  Add_New_Articles_By_Question(value: any) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/article/New_Article', { "data": value }, { headers: headers })
      .map(res => {
        console.log("Article Added Sucessfully");
        return res.json();
      });
  }

}