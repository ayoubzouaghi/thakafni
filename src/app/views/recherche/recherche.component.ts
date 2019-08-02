import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../Model/Publication.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
rechercheform:FormGroup;
displaylist=false;
id:string
  constructor(public fb:FormBuilder,public pubservice:PublicationService,public firestore:AngularFirestore) { }

  ngOnInit() {
    this.rechercheform = this.fb.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
     
    })
  }

  pub= this.firestore.collection('publication');

rechercher(){
  this.displaylist=true;

 this.pubservice.getbyid();

}
}
