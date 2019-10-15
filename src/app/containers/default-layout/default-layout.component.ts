import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT, getLocaleNumberFormat } from '@angular/common';
import { navItems } from '../../_nav';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/Auth/auth.service';
import { MessagingService } from '../../services/messaging.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  isAuth:boolean;
  message;
public isLogged:boolean
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  user: any;
  constructor( public authserv:AuthService,private messagingService: MessagingService,public router:Router) {
    this.user = this.authserv.afAuth.authState;

    this.user.subscribe((auth) => {

      if (auth) {

        this.isLogged = true;


        console.log('Connecté');



      } else {

        console.log('Déconnecté');

        this.isLogged = false;

      }
    })
  
  }

  ngOnInit(
   
  ) {
    
    //notif
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
);
}
  onSignOut(){
    return this.authserv.logout()
  }
  Redirect(){
    if(this.isLogged==false){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/deposit']);
  
    }
  }
  Redirect1(){
    if(this.isLogged==false){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/don']);
  
    }
  }
}