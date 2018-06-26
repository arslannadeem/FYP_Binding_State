import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class ModifyTopicService {

  constructor(private http : Http) { }

  authToken : any;

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }
  
    Show_Topics_with_subTopics_Left(value : any)
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      console.log("service")
      return this.http.get('http://localhost:3000/modify-topic/Show_Topics_Left',{headers : headers})
      .map(res => {
        
        console.log("Topics service");

        return res.json();
      })
    }

    Show_Topics_with_subTopics_Right(value : any)
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      console.log("service")
      return this.http.get('http://localhost:3000/modify-topic/Show_Topics_Right',{headers : headers})
      .map(res => {
        
        console.log("Topics service");

        return res.json();
      })
    }

}