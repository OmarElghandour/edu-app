import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm : FormGroup;
  constructor(
      private formBuilder : FormBuilder,
      private authService : AuthService,
      private router : Router
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
       credential : '',
       password : ''
    });
  }

  login(){
    let userData = this.loginForm.value;
    this.authService.loginUser(userData).subscribe(data => {
      console.log(data);
      if(data['status'] === 'valid credentials'){
        localStorage.setItem('user',data['userId']);
        this.router.navigate([''])
      }
    });
  }
}
