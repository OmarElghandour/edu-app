import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpentokService {

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
    return this.http.get('http://localhost:3000/token/allSessions');
  }


  async initSession(){
    if (this.sessionId && this.token) {
      await fetch(config.SAMPLE_SERVER_BASE_URL + 'subscribe' ,{
        method : 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers : {
          'Content-Type': 'application/json'
        },body : JSON.stringify({sessionId :this.sessionId , subscriberId : 56 })
      }
      );
     return this.session = this.getOT().initSession(config.API_KEY, this.sessionId);
    }else {
      const data = await fetch(config.SAMPLE_SERVER_BASE_URL,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ createdBy: 42 }) // body data type must match "Content-Type" header
      });
      const json = await data.json();
      this.session = this.getOT().initSession(config.API_KEY, json.session);
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
