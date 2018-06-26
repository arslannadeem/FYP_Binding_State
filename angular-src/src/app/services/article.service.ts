import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class ArticleService {

  authToken : any;

  constructor(private http : Http) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

    addArticleData()
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      console.log("article service");
      return this.http.post('http://localhost:3000/article/newArticle',{headers : headers})
      .map(res => {
        return res.json();
      })
    }
}