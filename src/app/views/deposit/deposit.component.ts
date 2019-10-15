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
import { navItems } from '../../_nav';
import { AuthService } from '../../services/Auth/auth.service';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  deposeform: FormGroup;
  publication:Publication
user:User
  pub: Publication[]
  booksSubscription: Subscription;
  list: Publication[]
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public userUid : any;
  constructor(
    private pubservice: PublicationService,
    private router: Router,
    public fb: FormBuilder,
    public firestore: AngularFirestore,
    public authserv: AuthService
  ) { 
    

  }

  ngOnInit() {
    this.authserv.afAuth.authState.subscribe((auth) => {
      if(auth)
      { this.publication.user_id = auth.uid;
        console.log('auth', auth)
        console.log(auth.uid)

      }
    })

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
      photo: ['', [Validators.required]],




    })
  }
  submitBook(user: User) {
    if (this.deposeform.valid) {
console.log('form value', this.deposeform.value)
      // changer les attributs du modèle publication == formcontrolname

      this.pubservice.addPublication(this.deposeform.value);
    }
  }

}
