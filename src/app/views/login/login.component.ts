import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { User } from '../../Model/User.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  errorMessage: any;
  successMessage: string;
  constructor(public authServ: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }
  ngOnInit() {
    this.initform();
    this.authServ.getuser().subscribe(user => {
      console.log(user);
    })
  }
  initform() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  Signin() {
    const email = this.loginform.get('email').value;
    const password = this.loginform.get('password').value;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user.emailVerified) {
            this.router.navigate(['/dashboard']);
            resolve(res);
          } else {
            this.errorMessage = "verifier votre adresse email!";
            this.successMessage = "";
          }

        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        })
    })

  }
  
  resetPassword() {
    const email = this.loginform.get('email').value;
    this.authServ.resetPassword(email)
  }
}
