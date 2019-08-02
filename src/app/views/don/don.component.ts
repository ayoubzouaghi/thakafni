import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-don',
  templateUrl: './don.component.html',
  styleUrls: ['./don.component.scss']
})
export class DonComponent  {
  itemtitre = '';
  itemnom = '';
  itemprenom = '';
  itemnombre = '';
  itemadresse = '';
  iteminformation = '';

  items: Observable<any[]>;
  donForm: FormGroup;
constructor(private fb: FormBuilder, private db: AngularFireDatabase,public afs:AngularFirestore) { 
this.items = this.db.list('messages').valueChanges()
// Passing in MD_Bootstrap form validation 
      this.donForm = fb.group({
      titre: ['', Validators.required],
      nom: ['', [Validators.required]],
      prenom: ['', Validators.required],
      nombre: ['', Validators.required],
      adresse: ['', Validators.required],
      information: ['', Validators.required]


   });
  }
// Pushing the contact-form to the firebase data base
     onSubmit()  {
     this.afs.collection('don').add({ nom: this.itemnom, prenomnom: this.itemprenom,titre: this.itemtitre, adresse: this.itemadresse, 
     information: this.iteminformation});
//Popup message
     alert('Merci de nous avoir contacté, votre message est passé!!')
    }
 
// Clearing the form after submit
clearForm() {
       this.donForm.reset();
      }
    }