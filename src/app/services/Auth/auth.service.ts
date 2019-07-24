import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../../Model/User.model';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection: AngularFirestoreCollection<User>
  user: Observable<User[]>;
  userData: any;


  constructor(private firestore: AngularFirestore,

    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,

  ) {


    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }


  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }
  doGoogleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider: auth.AuthProvider | auth.GoogleAuthProvider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.router.navigate(['/dashboard']);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);


  }

  doRegister(user: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
        setTimeout(() => {
          user.verified = false;
          user.emailToken = this.makeEmailToken(125);
          user.uid = res.user.uid;
          this.firestore.collection("user").add(user).then(res => {
            this.SendVerificationMail();
            resolve(res);
          });
        }, 300);

      });
    });
  }


  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/confirmation']);
      })
  }


  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  getuser() {
    this.userData = this.firestore.collection('user');
    return this.userData;
  }

  makeEmailToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}

