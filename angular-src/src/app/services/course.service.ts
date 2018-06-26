import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class CourseService {
  data : any;
  authToken : any;

  constructor(private http : Http) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

  //============================= Get All Course Data =======================  ok

  getCoursesData()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    console.log("before get course");
    return this.http.get('http://localhost:3000/course/getAllCourses',{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  //=============================== Add New Course Data =======================  ok

  addCourseData()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    //console.log("service")
    return this.http.post('http://localhost:3000/course/newCourse',{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  //============================ Get Topics By Course =======================  ok

  getTopicsByCourse(name : any)
  {
    this.data = {"course" : name};

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/course/getTopicsByCourse',(this.data),{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  //========================= Add Crawl Topics By Course =======================  ok

  add_Crawl_Topics(course_name : String, list : any)
  {
    this.data = {"List" : list,"course_name" : course_name};
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/course/add_Crawl_Topics',(this.data),{headers : headers})
    .map(res => {
      return res.json();
    })
  }

    // addTopicsData(list : any)
  // {
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization',this.authToken);
  //   headers.append('Content-Type','application/json');
  //   console.log("service")
  //   return this.http.post('http://localhost:3000/course/newTopics',list,{headers : headers})
  //   .map(res => {
  //     return res.json();
  //   })
  // }
}