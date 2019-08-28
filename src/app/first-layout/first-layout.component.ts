import { PublicationService } from '../services/publication/publication.service';
import { Publication } from '../Model/Publication.model';
import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT, getLocaleNumberFormat } from '@angular/common';
import { navItems } from '../_nav';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/Auth/auth.service';
import { MessagingService } from '../services/messaging.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-first-layout',
  templateUrl: './first-layout.component.html',
  styleUrls: ['./first-layout.component.scss']
})
export class FirstLayoutComponent implements OnInit {
  publication: Publication[]
  display: boolean = false;
  isAuth: boolean;
  message;
  display1: boolean = false;
  public isLogged:boolean;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  user: any;
  constructor(public pubservice: PublicationService,
     public authserv: AuthService,
      private messagingService: MessagingService,
      public router:Router) {
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

  ngOnInit() {
    this.pubservice.getPublication().subscribe(actionArray => {
      this.publication = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
    });
    console.log(localStorage.getItem("connected"));
    if (localStorage.getItem("connected") == "true") {
      this.display == true
    };
    //notif
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

    firebase.auth().onAuthStateChanged(

      (user) => {
        if (user) {
          this.isAuth = true;
        }
        else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut(){
    this.authserv.logout()
  }

  isLoggedIn() {
    return this.authserv.isLoggedIn();

  }
  openrecherche(){
    this.router.navigate(['/recherche']);
  }
opendeposit(){
  this.router.navigate(['/deposit']);

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
