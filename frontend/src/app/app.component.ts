import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
    }

}
