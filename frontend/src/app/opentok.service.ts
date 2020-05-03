import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;
  sessionId: string;
  constructor() { }

  getOT() {
    return OT;
  }

  initSession() {
    const sessionId = localStorage.getItem('session');
    const token = localStorage.getItem('token');
    if (token && sessionId) {
      this.session = this.getOT().initSession(config.API_KEY, sessionId);
      this.token = token;
      return Promise.resolve(this.session);
    } else {
      console.log(this.token);
      return fetch(config.SAMPLE_SERVER_BASE_URL)
        .then((data) => data.json())
        .then((json) => {
          localStorage.setItem('session', json.session);
          localStorage.setItem('token', json.token);
          console.log(json);
          this.session = this.getOT().initSession(config.API_KEY, json.session);
          this.token = json.token;
          return this.session;
        });
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
