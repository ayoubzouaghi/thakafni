import { Component, OnInit } from '@angular/core';
import { Publication } from '../Model/Publication.model';
import { PublicationService } from '../services/publication/publication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePublicationModalComponent } from '../delete-publication-modal/delete-publication-modal.component';
import { PublicatinDetailsModalComponent } from '../publicatin-details-modal/publicatin-details-modal.component';
import { DepositComponent } from '../views/deposit/deposit.component';

@Component({
  selector: 'app-tous-les-livres',
  templateUrl: './tous-les-livres.component.html',
  styleUrls: ['./tous-les-livres.component.scss']
})
export class TousLesLivresComponent implements OnInit {
  publication:Publication[]=[];
  titrelivre:string;
  constructor(public pubservice:PublicationService, private modalService: NgbModal) { }

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
  openPubDetailmodal() {
    const modalRef = this.modalService.open(PublicatinDetailsModalComponent);
    modalRef.componentInstance.name = 'World';
  }
 
 }