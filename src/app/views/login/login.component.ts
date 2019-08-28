import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { User } from '../../Model/User.model';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  errorMessage: any;
  successMessage: string;
  constructor(public authServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth) {

  }
  ngOnInit() {
    this.initform();
    
  }
  initform() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  
  
  resetPassword() {
    const email = this.loginform.get('email').value;
    this.authServ.resetPassword(email)
  }
  Signin(){
    let email=this.loginform.get('email').value;
    let password=this.loginform.get('password').value;

    this.authServ.Signin({ email, password })
  }
}
