import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT, getLocaleNumberFormat } from '@angular/common';
import { navItems } from '../../_nav';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/Auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  isAuth:boolean;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor( public authserv:AuthService) {

  
  }

  ngOnInit() {
firebase.auth().onAuthStateChanged(

  (user) =>{
    if (user){
      this.isAuth=true;
    }
    else{
      this.isAuth=false;
    }
  }
);}
  onSignOut(){
    this.authserv.logout()
  }
}