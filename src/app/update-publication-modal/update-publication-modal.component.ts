import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-publication-modal',
  templateUrl: './update-publication-modal.component.html',
  styleUrls: ['./update-publication-modal.component.scss']
})
export class UpdatePublicationModalComponent implements OnInit {
modifform:FormGroup
  constructor(public activeModal: NgbActiveModal,public fb:FormBuilder) { }

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

}
