import { Injectable } from '@angular/core';
import { Publication } from '../../Model/Publication.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../Model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  pubdata:Publication;
  user:User;
  Pub:Publication;
  pub: Observable<Publication | null>;
  publicationCollection: AngularFirestoreCollection<Publication>;
  constructor(private firestore: AngularFirestore,

    public afAuth: AngularFireAuth,
    private router :Router,private db: AngularFireDatabase) { 
      this.publicationCollection = this.firestore.collection('publication');

    }



  addPublication(pub:Publication[]){

    this.firestore.collection("publication").add(pub).then(res => {
     
      this.router.navigate(['/profile']);
  })}
getpub(){
  return this.firestore.collection('publication').snapshotChanges();
}

onDelete() {

  if (confirm("Voulez vous vraiment supprimer cette publication?")) {
    this.firestore.collection('publication').doc().delete();
  }
}

}
