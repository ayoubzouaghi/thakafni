import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../../Model/User.model';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Upload } from '../../Model/Upload.model';
import { switchMap, first } from 'rxjs/operators';
import { NGB_DATEPICKER_PARSER_FORMATTER_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection:  AngularFirestoreCollection<any> = this.firestore.collection('user');
  user: Observable<User[]>;
  userData: any;
  private basePath: string = '/uploads';
  uploads: AngularFireList<Upload[]>;
  errorMessage: string;
  successMessage: string;
  public logged: boolean
  newUser: any
  private currentUser: firebase.User = null;
  isLogged: boolean
  constructor(private firestore: AngularFirestore,

    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,

  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('test1', user.uid)
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        console.log('testt2')
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }


  Signin(user) {

    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then(res => {

          if (res.user.emailVerified) {
 console.log('tesyt3', res.user)
            this.router.navigate(['/first-layout']);
            this.SetUserData(res.user);

            localStorage.setItem("connected", "true");
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
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      nom: user.nom,
      photoURL: user.photoURL,
      verified: user.emailVerified,
      prenom: user.prenom,
      password: user.password,
      emailToken: user.emailToken
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  getUser() {
    return this.user.pipe(first()).toPromise();
  }


  isLoggedIn() {
    if (this.currentUser == null) {
     return false
    } else {
      return true
    }
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
    this.router.navigate(['/first-layout']);
  }



  doRegister(user: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
        this.newUser = user;
        console.log(res)
        console.log(this.newUser)
        res.user.updateProfile({
          displayName: user.nom + ' ' + user.prenom
        });
        localStorage.setItem('user', JSON.stringify(this.newUser));
        JSON.parse(localStorage.getItem('user'));

        /*setTimeout(() => {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
          const userData: User = {
            uid: user.uid,
            email: user.email,
            nom: user.nom,
            prenom:user.prenom,
            photoURL: user.photoURL,
            verified: user.verified,
            emailToken:user.emailToken,
            password:user.password
          }
          return userRef.set(userData, {
            merge: true
            
          })
          
        }, 300);
        */
        this.firestore.collection("user").add(user).then(res => {
          this.SendVerificationMail();
          resolve(res);
        });

      });
    });
  }


  logout() {
   this.afAuth.auth.signOut().then(() => {
  
    this.router.navigate(['first-layout']);})
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
    return this.firestore.collection('user').snapshotChanges();

  }
  getuserbyid() {
    return this.firestore.doc((`user/${this.currentUser.uid}`));

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




  // fireebase files must have unique names in their respective storage dir
  // So the name serves as a unique key




  pushFileToStorage(Upload: Upload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${Upload.file.name}`).put(Upload.file);
    const path = '/user/${this.user.uid}.jpg';
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        Upload.url = uploadTask.snapshot.downloadURL;
        console.log(Upload.url)
        Upload.name = Upload.file.name;
        this.saveFileData(Upload);
      }
    );
  }

  private saveFileData(Upload: Upload) {
    this.db.list(`${this.basePath}/`).push(Upload);
    this.SetUserData({"imageUrl" : "test"})

  }

  getUploads(numberItems): AngularFireList<Upload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteUpload(Upload: Upload) {
    this.deleteFileDatabase(Upload.key)
      .then(() => {
        this.deleteFileStorage(Upload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  updateUser(user) {
    this.userCollection.doc(user.uid).update({
      nom:user.nom,
      prenom:user.prenom,
      email: user.email,
     
})}

}



