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

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  pubdata:Publication;
  user:User;
  Pub:Publication;
  pub: Observable<Publication | null>;
  pubDoc: AngularFirestoreDocument<Publication>;
  publicationCollection: AngularFirestoreCollection<any> = this.firestore.collection('publication');
  pubobs = this.publicationCollection.valueChanges();
  pubs = firebase.firestore().collection('Publication');
  docRef = this.firestore.collection('publication').doc('uid');
  constructor(private firestore: AngularFirestore,

    public afAuth: AngularFireAuth,
    private router :Router) { 
   this.publicationCollection = this.firestore.collection('publication');
    }

// ADD 

  addPublication(pub:Publication[]){
    
    this.firestore.collection("publication").add(pub).then(() => {
      this.router.navigate(['/profile']);
  })}


// GET
getPublication(){
  return this.firestore.collection('publication').snapshotChanges();
}


getPubByTitre(pub){


this.docRef=this.firestore.doc((`publication/${pub.titrelivre}`))
}
//DELETE



deletePub(pub:Publication) {
  this.pubDoc= this.firestore.doc((`publication/${pub.uid}`));
  this.pubDoc.delete().then(() => {
    console.log('deleted');
  })
}
//UPDATE
updatePub(publication) {
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

}
