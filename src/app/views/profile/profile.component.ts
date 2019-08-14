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
import { DepositComponent } from '../deposit/deposit.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData
  displayImg
  user
  publication:Publication[]=[];
  fileUploads: any[];

  id: Publication
  selectedFiles: FileList;
  currentFileUpload: Upload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public authService: AuthService,
     public afs: AngularFirestore,
      private pubservice: PublicationService,
      private modalService: NgbModal) {
    // this.user = JSON.parse(localStorage.getItem('user'));


  }




  ngOnInit() {
    this.pubservice.getPublication().subscribe(actionArray => {
      this.publication = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
    });



    this.authService.getuser().subscribe(actionArray => {
      this.user = actionArray.filter(item => {
        console.log('testttt item', item)
        let user = {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
          
        } as User;
        if (user.uid == JSON.parse(localStorage.getItem('user')).uid) {
         
return user
        }
          console.log('testt',user)
        
    })})
  
  // Use snapshotChanges().map() to store the key
  this.displayImg = this.authService.getUploads(0)
  console.log(this.displayImg)
}
  
  
getuser(){

  this.authService.getuserbyid(this.user.uid);
}

  onDelete(pub) {
    this.pubservice.deletePub(pub);
  }
  // ouvrir le modal pour modifier la photo de profil
  openEditPictureModal() {
    const modalRef = this.modalService.open(EditProfilPictureModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  openEditCoordonneeModal() {
    const modalRef = this.modalService.open(EditProfilCoordonneeModalComponent);
    modalRef.componentInstance.name = 'World';

  }
  openDeleteModal() {
    const modalRef = this.modalService.open(DeletePublicationModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  openPubDetailmodal() {
    const modalRef = this.modalService.open(PublicatinDetailsModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  openUpdatePubModal() {
    const modalRef = this.modalService.open(DepositComponent, { size: 'lg' });
  
    modalRef.componentInstance.name = 'World';
  }
}
