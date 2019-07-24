import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AuthService } from '../../services/Auth/auth.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {

  public email_token: string;
  constructor(public authService: AuthService,private activatedRoute: ActivatedRoute, private firestore: AngularFirestore, private db: AngularFireDatabase) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email_token = params['token'];
      console.log(this.email_token);
    });
  }

  ngOnInit() {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`user/${this.email_token}`);
    userRef.get()
    .subscribe((snapshot:any) => {
      console.log(snapshot);
      console.log(snapshot._document.proto.fields);
      
    })
  }

}
