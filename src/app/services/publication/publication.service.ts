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
  pubDoc: AngularFirestoreDocument<User>;
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


getbyid(){


this.docRef.get().subscribe((res) =>{
  console.log(res.data)
    if (res.exists) {
        console.log("Document data:", res.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
})
}
//DELETE



deletePub(pub) {

  this.publicationCollection.doc(pub.uid).delete().then(() => {
    console.log('deleted');
  })
}
//UPDATE
update(pub) {
  this.publicationCollection.doc(pub.uid).update({
    titrelivre: 'newprodname',
    auteur: 'newprodname',
    edition: 'newprodname',
    type_annonce: 'newprodname',
    adresse: 'newprodname',
    ville: 'newprodname',
    code_postale: 'newprodname',
    langue: 'newprodname',
    description: 'newprodname',


  }).then(() => {
    console.log('updated');
  })
}

getlivredon(){
  return this.firestore.collection('don').snapshotChanges();

}

}
