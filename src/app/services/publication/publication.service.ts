import { Injectable } from '@angular/core';
import { Publication } from '../../Model/Publication.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../Model/User.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  pubdata:Publication;
  user:User;
  userId : any;
  Pub:Publication;
  pub: Observable<Publication | null>;
  pubDoc: AngularFirestoreDocument<Publication>;
  publicationCollection: AngularFirestoreCollection<any> = this.firestore.collection('publication');
  pubobs = this.publicationCollection.valueChanges();
  pubs = firebase.firestore().collection('Publication');
  docRef = this.firestore.collection('publication').doc('uid');
  userCollection:  AngularFirestoreCollection<any> = this.firestore.collection('user');

  constructor(private firestore: AngularFirestore,

    public afAuth: AngularFireAuth,
    private router :Router, public authserv: AuthService) { 
   this.publicationCollection = this.firestore.collection('publication');

  
    }

// ADD 

  addPublication(pub:Publication[]){

    console.log(pub)
    this.firestore.collection("publication").add(pub).then(() => {
      this.router.navigate(['/profile']);
  })}

getPublicationByUser()
{
  this.authserv.afAuth.authState.subscribe((auth) => {
    if(auth)
    {
      this.userId= auth.uid

    //   console.log(this.firestore.collection('publication').doc(this.userId))
    //   console.log(this.firestore.doc('publication/' + auth.uid))
    //   console.log( this.firestore.doc((`publication/${auth.uid}`)))
    //   console.log( this.firestore.collection("publication").doc(auth.uid))
    //   this.firestore.doc((`publication/${auth.uid}`)).get().forEach((a)=>{
    //        console.log(a)
    //   })
    //   this.firestore.doc('publication/' + auth.uid).valueChanges().subscribe(actionArray => {
    //     console.log(actionArray)
    //   })
    //   this.userId= auth.uid
    //   console.log(auth)
    //   console.log(auth.uid)
    // }

   
    }else if(auth.uid==this.userId){
      
    }
    }
  )
  return this.firestore.collection('publication').snapshotChanges();}


// GET
getPublication(){
 return this.firestore.collection('publication').snapshotChanges();

}


getPubByTitre(pub){
this.docRef=this.firestore.doc((`publication/${pub.titrelivre}`))
}
//DELETE



deletePub(publication:Publication) {
  this.firestore.collection('publication').doc(publication.uid).delete()
}
//UPDATE
updatePub(publication:Publication) {
  this.publicationCollection.doc(publication.uid).update({
    titrelivre: publication.titrelivre,
    auteur: publication.auteur,
    edition: publication.edition,
    type_annonce: publication.type_annonce,
    adresse:publication.adresse,
    ville: publication.ville,
    code_postale: publication.code_postale,
    langue:publication.langue,
    description:publication.description,


  }).then(() => {
    console.log('updated');
  })
}

getlivredon(){
  return this.firestore.collection('don').snapshotChanges();

}
updateUser(user) {
  this.userCollection.doc(user.uid).update({
    nom:user.nom,
    prenom:user.prenom,
    email: user.email,
   
})}
}
