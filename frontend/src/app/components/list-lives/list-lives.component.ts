import { Component, OnInit } from '@angular/core';
import {OpentokService} from "../../opentok.service";

@Component({
  selector: 'app-list-lives',
  templateUrl: './list-lives.component.html',
  styleUrls: ['./list-lives.component.css']
})
export class ListLivesComponent implements OnInit {
  lives : any;
  constructor(private openTok : OpentokService) { }

  ngOnInit() {
    this.getSesstions();
  }

  getSesstions(){
    this.openTok.getSessions().subscribe(data => {
      this.lives = data;
      console.log(data);
    })
  }
  
}
