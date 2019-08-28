import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/Auth/auth.service';
import { User } from '../Model/User.model';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profil-coordonnee-modal',
  templateUrl: './edit-profil-coordonnee-modal.component.html',
  styleUrls: ['./edit-profil-coordonnee-modal.component.scss']
})
export class EditProfilCoordonneeModalComponent implements OnInit {

  @Output('update') updateuser = new EventEmitter();
  @Input('user') user:any;


  modificationForm: FormGroup;



  userCollection: AngularFirestoreCollection<any> = this.afs.collection('user');
  pubobs = this.userCollection.valueChanges();
  constructor(private formBuilder: FormBuilder,
    public authservice:AuthService,
    public afs:AngularFirestore
  ) { }

  ngOnInit() {
    this.initform();
  }
  //Initialisation du formulaire
  initform() {
    this.modificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],

    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  update(user)
  {
    user.nom=  this.modificationForm.get('nom').value
    user.prenom=  this.modificationForm.get('prenom').value
    user.email= this.modificationForm.get('email').value
      
      this.updateuser.emit(user);
    }

   

  }
 

  

