import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication/publication.service';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Publication } from '../Model/Publication.model';

@Component({
  selector: 'app-delete-publication-modal',
  templateUrl: './delete-publication-modal.component.html',
  styleUrls: ['./delete-publication-modal.component.scss']
})
export class DeletePublicationModalComponent implements OnInit {
  publicationCollection: AngularFirestoreCollection<any> = this.firestore.collection('publication');
  pubobs = this.publicationCollection.valueChanges();
  pub: Observable<Publication | null>;

  constructor(public pubservice:PublicationService,public activeModal: NgbActiveModal,public firestore:AngularFirestore) { }

  ngOnInit() {
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
    onDelete(){
      console.log(this.pubservice.deletePub(this.pub))
    }
}
