import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Don } from '../../Model/Don.model';
import { PublicationService } from '../../services/publication/publication.service';

@Component({
  selector: 'app-add-don',
  templateUrl: './add-don.component.html',
  styleUrls: ['./add-don.component.scss']
})
export class AddDonComponent implements OnInit {
  public itemtitre = '';
  public itemnom = '';
  public itemprenom = '';
  public itemtel = '';
  public itememail = '';

  public itemnombre = '';
  public itemadresse = '';
  public iteminformation = '';

  public  don:Don[]=[]
  public items: Observable<any[]>;
  public  donForm: FormGroup;
  public show:boolean=false
  constructor(private fb: FormBuilder, 
    private db: AngularFireDatabase,
    public afs:AngularFirestore,
    private modalService: NgbModal,
    public pubservice: PublicationService) { 
      this.items = this.afs.collection('don').valueChanges()
// Passing in MD_Bootstrap form validation 
      this.donForm = fb.group({
      titre: ['', Validators.required],
      nom: ['', [Validators.required]],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      adresse: ['', Validators.required],
      information: ['', Validators.required]


   });
    
  }

  ngOnInit() {
  }

    //modalRef.componentInstance.name = 'World';
  
// Pushing the contact-form to the firebase data base
     onSubmit()  {
     this.afs.collection('don').add({ 
       nom: this.itemnom,
       prenom: this.itemprenom,
       tel:this.itemtel,
       email:this.itememail,
       titre: this.itemtitre, 
       adresse: this.itemadresse,
       nombre_de_livre: this.itemnombre,
       information: this.iteminformation});
//Popup message
     alert('Merci de nous avoir donnés vos livres')
     this.donForm.reset();
    }
    
  }