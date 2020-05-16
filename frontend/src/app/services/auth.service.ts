import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

const API = `${environment.baseApiUrl}/subscribers/`;
@Injectable()
export class AuthService {

  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  registerUser(data) {
   return this.http.post(API + 'register' , data , this.httpOptions);
  }

  loginUser(data) {
    return this.http.post(API + 'login' , data , this.httpOptions);
   }

}
