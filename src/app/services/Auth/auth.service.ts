import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../../Model/User.model';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Upload } from '../../Model/Upload.model';
import { switchMap, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection: AngularFirestoreCollection<User>
  user: Observable<User[]>;
  userData: any;
  private basePath:string = '/uploads';
  uploads: AngularFireList<Upload[]>;

  

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
    })}
getUser(){
return this.user.pipe(first()).toPromise();
}
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null && user.verified !== false) ? true : false;
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
    /*const data: User = {
      uid: user.uid,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      password:user.password,
      verified:user.verifeid,
      emailToken:user.emailToken

    }
    return userRef.set(data, { merge: true })*/

  }

  doRegister(user: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
        setTimeout(() => {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
          const userData: User = {
            uid: user.uid,
            email: user.email,
            nom: user.nom,
            photoURL: user.photoURL,
            verified: user.verified,
            emailToken:user.emailToken,
            password:user.password
          }
          return userRef.set(userData, {
            merge: true
            
          })
          
        }, 300);
        this.firestore.collection("user").add(user).then(res => {
          this.SendVerificationMail();
          resolve(res);
        });

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
    return this.firestore.collection('user').snapshotChanges();
    
  }
  getuserbyid(uid) {
    return this.firestore.collection('user').doc('user.uid').snapshotChanges();
    
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
        Upload.name = Upload.file.name;
        this.saveFileData(Upload);
      }
    );
  }
 
  private saveFileData(Upload: Upload) {
    this.db.list(`${this.basePath}/`).push(Upload);
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

  
}





