import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../Model/User.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  user: User[];
  registerForm: FormGroup;
  errorMessage: string;
  afAuth: any;
  successMessage: string;
  constructor(
    private firestore: AngularFirestore,
    public service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public ngZone: NgZone) {
   
  }

  ngOnInit() {
    this.initform();
  }
  //Initialisation du formulaire
  initform() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],

    });
  }


  //Register { email: string; password: string; last_name: string; first_name: string }
  tryRegister(value: User) {
    console.log('value=> ',value)
    this.service.doRegister(value)
      .then(res => {
        this.router.navigate(['/dashboard']);
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
  //signupwith google
  signupgoogle() {

    console.log('hi google');
    this.service.doGoogleLogin();
  }
  //signup with facebook
  signupfacebook() {
    console.log('hello Facebook');
    this.service.doFacebookLogin();
  }

  createUser(User: User) {
  }
}
