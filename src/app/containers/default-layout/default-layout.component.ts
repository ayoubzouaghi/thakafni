import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT, getLocaleNumberFormat } from '@angular/common';
import { navItems } from '../../_nav';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/Auth/auth.service';
import { MessagingService } from '../../services/messaging.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  isAuth:boolean;
  message;

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor( public authserv:AuthService,private messagingService: MessagingService) {

  
  }

  ngOnInit(
   
  ) {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    
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