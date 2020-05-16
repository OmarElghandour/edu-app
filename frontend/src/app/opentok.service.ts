import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable()
export class OpentokService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  session: OT.Session;
  token: string;
  sessionId: string;
  constructor(private http: HttpClient) { }

  setSession(obj){
   this.sessionId = obj.session;
   this.token = obj.token;
   console.log(obj);
  }

  getOT() {
    return OT;
  }
  getSessions(){
    return this.http.get( environment.baseApiUrl + 'token/allSessions');
  }

  setinfo(){
    return this.session = this.getOT().initSession(config.API_KEY, this.sessionId);
  }
  async initSession(){
      console.log(this.sessionId);
      console.log(this.token);
    if (this.sessionId && this.token) {
   this.http.post(config.SAMPLE_SERVER_BASE_URL + 'subscribe', { sessionId: this.sessionId, subscriberId: localStorage.getItem('user') }, this.httpOptions).subscribe(data => {
   });
        console.log('config.API_KEY');
        console.log(config.API_KEY);
   return this.session = this.getOT().initSession(environment.openTokApi, this.sessionId);


    //   await fetch(config.SAMPL E_SERVER_BASE_URL + 'subscribe' ,{
    //     method : 'POST',
    //     mode: 'cors', // no-cors, *cors, same-origin
        // headers : {
        //   'Content-Type': 'application/json'
        // },body : JSON.stringify({sessionId :this.sessionId , subscriberId : 56 })
    //   }
    //   );
    //  return this.session = this.getOT().initSession(config.API_KEY, this.sessionId);
    }else {
      const data = await fetch(environment.baseApiUrl + 'token',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ createdBy: localStorage.getItem('user')}) // body data type must match "Content-Type" header
      });
      const json = await data.json();
        console.log(config.API_KEY);
        this.session = this.getOT().initSession(environment.openTokApi, json.session);
      this.token = json.token;
      return this.session;

    }
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        console.log(err);
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}
