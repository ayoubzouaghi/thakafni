import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/Auth/auth.service';
import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  user: firebase.User;

  constructor(private router: Router, private afAuth: AngularFireAuth, private loginservice: AuthService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      this.user = user;
    });

    this.router.events.subscribe((evt) => {
      /*
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      */
    });
  }
}


