import { Component, OnInit, ChangeDetectorRef,isDevMode } from '@angular/core';
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
        if (isDevMode()) {
            console.log('👋 Development!');
        } else {
            console.log('💪 Production!');
        }
    }

}
