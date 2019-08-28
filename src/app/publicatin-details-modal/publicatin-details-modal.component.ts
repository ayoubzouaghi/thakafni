import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationService } from '../services/publication/publication.service';
import { Publication } from '../Model/Publication.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-publicatin-details-modal',
  templateUrl: './publicatin-details-modal.component.html',
  styleUrls: ['./publicatin-details-modal.component.scss']
})
export class PublicatinDetailsModalComponent implements OnInit {
  listcollection:   AngularFirestoreCollection<any> = this.firestore.collection('publication');
  lists = this.listcollection.valueChanges();
  publication: Publication[] = [];


  constructor(public activeModal: NgbActiveModal,public pubservice:PublicationService,public firestore:AngularFirestore) { }

  ngOnInit() {
    this.pubservice.getPublication().subscribe(actionArray => {
      this.publication = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
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

}
