import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddDonComponent } from '../add-don/add-don.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationService } from '../../services/publication/publication.service';
import { Don } from '../../Model/Don.model';

@Component({
  selector: 'app-don',
  templateUrl: './don.component.html',
  styleUrls: ['./don.component.scss']
})
export class DonComponent  {
 public itemtitre = '';
 public itemnom = '';
 public itemprenom = '';
 public itemtel='';
 public itememail='';
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

    this.pubservice.getlivredon().subscribe(actionArray => {
      this.don = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Don;
      })
    });
   
  }

  openAddDonModal() {
    const modalRef = this.modalService.open(AddDonComponent, { size: 'lg' });
    //modalRef.componentInstance.name = 'World';
  }
// Pushing the contact-form to the firebase data base
     onSubmit()  {
       console.log('hi')
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
    }
    showMe(){
      if(this.show==false){
    this.show=true;}
    else{
      this.show=false
    }
    }
  }