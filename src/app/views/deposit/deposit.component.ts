import { Component, OnInit } from '@angular/core';
import { Book } from '../../Model/Books.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../Model/Publication.model';
import { User } from '../../Model/User.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  deposeform: FormGroup;
  pub: Publication[]
  booksSubscription: Subscription;
  list:Publication[]
  constructor(
    private pubservice: PublicationService,
    private router: Router,
    public fb: FormBuilder,
    public firestore:AngularFirestore,
  ) { }

  ngOnInit() {
    this.submitBookForm();
  
  }

  
  submitBookForm() {
    this.deposeform = this.fb.group({
      titrelivre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      type_annonce: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      code_postale: ['', [Validators.required]],
      description: ['', [Validators.required]],
      langue: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      edition: ['', [Validators.required]],




    })
  }
  submitBook(user:User) {
    if (this.deposeform.valid) {
      
      // changer les attributs du modèle publication == formcontrolname

      this.pubservice.addPublication(this.deposeform.value);
    }
  }
  
}
