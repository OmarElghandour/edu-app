import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000/subscribers/'
@Injectable()
export class AuthService {

  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  registerUser(data) {
    console.log(data);
   return this.http.post(API + 'register' , data , this.httpOptions);
  }
}
