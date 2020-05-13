import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  constructor(
        private formBuilder: FormBuilder,
        private authService : AuthService
    )
     { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      email: [''],
      password : ['']
    });

  }
  saveUser(){
    const userData = this.registerForm.value;
    this.authService.registerUser(userData).subscribe(data => {
      console.log(data);
    })
    console.log(this.registerForm.value);


  }
}
