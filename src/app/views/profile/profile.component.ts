import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../Model/User.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Publication } from '../../Model/Publication.model';
import { PublicationService } from '../../services/publication/publication.service';
import { Upload } from '../../Model/Upload.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfilPictureModalComponent } from '../../edit-profil-picture-modal/edit-profil-picture-modal.component';
import { EditProfilCoordonneeModalComponent } from '../../edit-profil-coordonnee-modal/edit-profil-coordonnee-modal.component';
import { DeletePublicationModalComponent } from '../../delete-publication-modal/delete-publication-modal.component';
import { PublicatinDetailsModalComponent } from '../../publicatin-details-modal/publicatin-details-modal.component';
import { UpdatePublicationModalComponent } from '../../update-publication-modal/update-publication-modal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user
  pub: Publication[]
  lists:Publication[]
  id:Publication
  selectedFiles: FileList;
  currentFileUpload: Upload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public authService:AuthService,public afs:AngularFirestore,private pubservice: PublicationService,private modalService: NgbModal) { 
   this.user = localStorage.getItem('user')
   if(this.user != undefined){
    console.log(this.user['providerData'])
    console.log(this.user.data)
    console.log(this.user)
    

   }
  
  }
  



  ngOnInit() {
      this.pubservice.getPublication().subscribe(actionArray => {
      this.lists = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
    });
console.log("hi",this.authService.userData)





  }

  onDelete(pub) {
    this.pubservice.deletePub(pub);
    }
// ouvrir le modal pour modifier la photo de profil
openEditPictureModal(){
    const modalRef = this.modalService.open(EditProfilPictureModalComponent);
    modalRef.componentInstance.name = 'World';
}
openEditCoordonneeModal(){
  const modalRef = this.modalService.open(EditProfilCoordonneeModalComponent);
  modalRef.componentInstance.name = 'World';

}
openDeleteModal(){
  const modalRef = this.modalService.open(DeletePublicationModalComponent);
  modalRef.componentInstance.name = 'World';
}
openPubDetailmodal(){
  const modalRef = this.modalService.open(PublicatinDetailsModalComponent);
  modalRef.componentInstance.name = 'World';
}
openUpdatePubModal(){
  const modalRef = this.modalService.open(UpdatePublicationModalComponent);
  modalRef.componentInstance.name = 'World';
}
}
