import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-update-publication-modal',
  templateUrl: './update-publication-modal.component.html',
  styleUrls: ['./update-publication-modal.component.scss']
})
export class UpdatePublicationModalComponent implements OnInit {
  @Output('update') update = new EventEmitter();
  @Input('publication') publication:any;
  modifform:FormGroup

  constructor(public fb:FormBuilder,public afs:AngularFirestore) { 

  }   


  ngOnInit() {
    this.submitBookForm();
  
  }

  
  submitBookForm() {
    this.modifform = this.fb.group({
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  updatePublication(publication) {
   publication.titrelivre=this.modifform.get('titrelivre').value
   publication.auteur=this.modifform.get('auteur').value
   publication.langue=this.modifform.get('langue').value
   publication.adresse=this.modifform.get('adresse').value
   publication.ville=this.modifform.get('ville').value
   publication.code_postale=this.modifform.get('code_postale').value
   publication.edition=this.modifform.get('edition').value
   publication.description=this.modifform.get('description').value
   publication.categorie=this.modifform.get('categorie').value
   publication.type_annonce=this.modifform.get('type_annonce').value


console.log('ahaya',publication)
  this.update.emit(publication)
}

}
