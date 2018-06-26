import { Injectable,Inject } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AuthService {
  authToken : any;
  user : any;
  
  constructor(private http : Http,@Inject(LOCAL_STORAGE) private storage: WebStorageService) { 
  }

  registerUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers : headers})
    .map(res => res.json());
  }

  authenticationUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers : headers})
    .map(res => res.json());
  }

   getProfile()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    console.log("RETRIEVING PROFILE");
    return this.http.get('http://localhost:3000/users/profile',{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  storeUserData(token , user)
  {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;

    this.getProfile().subscribe(profile => {
      this.saveInLocal("useremail",profile.user.email);
     //  console.log('==> recieved= key:' + key + 'value:' + val);
      this.storage.set("useremail", profile.user.email);
      this.storage.set("username",profile.user.username);
      console.log('==> recieved= key: "useremail" '+ 'value:' + profile.user.email);
   });

  }

  saveInLocal(key, val): void {
    console.log('==> recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
     // this.data[key] = this.storage.get(key);

  }

  loadToken(){
     const token = localStorage.getItem('id_token');
     this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}