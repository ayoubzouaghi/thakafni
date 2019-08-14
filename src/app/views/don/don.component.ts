import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddDonComponent } from '../../add-don/add-don.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
constructor(private fb: FormBuilder, 
  private db: AngularFireDatabase,
  public afs:AngularFirestore,
  private modalService: NgbModal) { 
this.items = this.afs.collection('don').valueChanges()
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
  openAddDonModal() {
    const modalRef = this.modalService.open(AddDonComponent, { size: 'lg' });
    //modalRef.componentInstance.name = 'World';
  }
// Pushing the contact-form to the firebase data base
     onSubmit()  {
     this.afs.collection('don').add({ 
       nom: this.itemnom,
       prenom: this.itemprenom,
       titre: this.itemtitre, 
       adresse: this.itemadresse,
       nombre_de_livre: this.itemnombre,
       information: this.iteminformation});
//Popup message
     alert('Merci de nous avoir donnés vos livres')
     this.donForm.reset();
    }}