import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Publication } from '../../Model/Publication.model';

@Component({
  selector: 'app-update-publication-modal',
  templateUrl: './update-publication-modal.component.html',
  styleUrls: ['./update-publication-modal.component.scss']
})
export class UpdatePublicationModalComponent implements OnInit {
  @Output('update') update = new EventEmitter();
  @Input('publication') publication: Publication;
  public modifform: FormGroup

  constructor(public fb: FormBuilder, public afs: AngularFirestore) {

  }


  ngOnInit() {
    console.log('publication', this.publication)
    this.modifform = this.fb.group({
      titrelivre: [this.publication.titrelivre, [Validators.required]],
      auteur: [this.publication.auteur, [Validators.required]],
      type_annonce: [this.publication.type_annonce, [Validators.required]],
      adresse: [this.publication.adresse, [Validators.required]],
      ville: [this.publication.ville, [Validators.required]],
      code_postale: [this.publication.code_postale, [Validators.required]],
      description: [this.publication.description, [Validators.required]],
      langue: [this.publication.langue, [Validators.required]],
      categorie: [this.publication.categorie, [Validators.required]],
      edition: [this.publication.edition, [Validators.required]],
    })

  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updatePublication() {
    let newPublication = new Publication();
    console.log(this.modifform.value);

    newPublication.uid = this.publication.uid;
    newPublication.user_id = this.publication.user_id;


    newPublication.titrelivre = this.modifform.get('titrelivre').value
    newPublication.auteur = this.modifform.get('auteur').value
    newPublication.langue = this.modifform.get('langue').value
    newPublication.adresse = this.modifform.get('adresse').value
    newPublication.ville = this.modifform.get('ville').value
    newPublication.code_postale = this.modifform.get('code_postale').value
    newPublication.edition = this.modifform.get('edition').value
    newPublication.description = this.modifform.get('description').value
    newPublication.categorie = this.modifform.get('categorie').value
    newPublication.type_annonce = this.modifform.get('type_annonce').value
    console.log('ahaya', newPublication)
    this.update.emit(newPublication);
  }

}
