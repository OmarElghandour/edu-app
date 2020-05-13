import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as OT from '@opentok/client';
import {OpentokService} from "../../opentok.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title = 'Angular Basic Video Chat';
    session: OT.Session;
    streams: Array<OT.Stream> = [];
    changeDetectorRef: ChangeDetectorRef;
    sessions;
    constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService) {
        this.changeDetectorRef = ref;
    }

    ngOnInit () {
    }

    initSession(){
        this.opentokService.initSession().then((session: OT.Session) => {
            this.session = session;
            this.session.on('streamCreated', (event) => {
                this.streams.push(event.stream);
                this.changeDetectorRef.detectChanges();
            });
            this.session.on('streamDestroyed', (event) => {
                const idx = this.streams.indexOf(event.stream);
                if (idx > -1) {
                    this.streams.splice(idx, 1);
                    this.changeDetectorRef.detectChanges();
                }
            });
        }).then(() => this.opentokService.connect())
            .catch((err) => {
                console.error(err);
                alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
            });

    }

    getSession() : void{
        this.opentokService.getSessions().subscribe(data => {
            this.sessions = data;
            let lastSession = this.sessions[this.sessions.length -1];
            console.log(lastSession)
            this.opentokService.setSession(lastSession);
            this.initSession();
        })
    }
    JoinSession(){
        this.getSession();
    }
}
