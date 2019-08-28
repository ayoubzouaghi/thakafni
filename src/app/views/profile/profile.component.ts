import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../Model/User.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Publication } from '../../Model/Publication.model';
import { PublicationService } from '../../services/publication/publication.service';
import { Upload } from '../../Model/Upload.model';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditProfilPictureModalComponent } from '../../edit-profil-picture-modal/edit-profil-picture-modal.component';
import { EditProfilCoordonneeModalComponent } from '../../edit-profil-coordonnee-modal/edit-profil-coordonnee-modal.component';
import { PublicatinDetailsModalComponent } from '../../publicatin-details-modal/publicatin-details-modal.component';
import { UpdatePublicationModalComponent } from '../../update-publication-modal/update-publication-modal.component';
import { DepositComponent } from '../deposit/deposit.component';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Output() delete = new EventEmitter();

  @ViewChild('deleteModal', { static: false }) deleteModal: ElementRef;

  @Output() update = new EventEmitter();

  @ViewChild('updateModal', { static: false }) updateModal: ElementRef;


  @Output() updateuser = new EventEmitter();

  @ViewChild('updateModalUser', { static: false }) updateModalUser: ElementRef;
  public imgSrc: string
  userData
  displayImg
  user
  publication: Publication[] = [];
  fileUploads: any[];
  public isLogged: Boolean;
  public show: boolean = false

  id: Publication
  selectedFiles: FileList;
  currentFileUpload: Upload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public authService: AuthService,
    public afs: AngularFirestore,
    private pubservice: PublicationService,
    private modalService: NgbModal) {
    // this.user = JSON.parse(localStorage.getItem('user'));

    this.user = this.authService.afAuth.authState;

    this.user.subscribe((auth) => {

      if (auth) {

        this.isLogged = true;


        console.log('Connecté');



      } else {

        console.log('Déconnecté');

        this.isLogged = false;

      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes=> ', changes)
    // if(changes[''])
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



    this.user = this.authService.getuserbyid()
    console.log('ahal w sahla', this.user)

    // Use snapshotChanges().map() to store the key
    this.displayImg = this.authService.getUploads(0)
    console.log(this.displayImg)
  }


  getuser() {

    this.authService.getuserbyid();
  }
  updatePublication(publication) {
    console.log('updated largat=> ', publication);
    this.pubservice.updatePub(publication);
    this.modalRefUpdate.close();
  }


  updateUser(user) {
    this.authService.updateUser(user);
    this.modalRefUpdateUser.close()
  }


  onDelete(publication) {
    console.log('delelted largat=> ', publication);
    this.pubservice.deletePub(publication);
    this.modalRefDelete.close();
    // this.delete.emit(pub);


  }
  // ouvrir le modal pour modifier la photo de profil
  openEditPictureModal() {
    const modalRef = this.modalService.open(EditProfilPictureModalComponent);
    modalRef.componentInstance.name = 'World';
  }


  public modalRefUpdateUser: NgbModalRef;
  openEditCoordonneeModal() {
    this.modalRefUpdateUser = this.modalService.open(this.updateModalUser);

  }


  public modalRefDelete: NgbModalRef;
  openDeleteModal() {
    this.modalRefDelete = this.modalService.open(this.deleteModal);
    // modalRef.componentInstance.name = 'World';
  }

  openPubDetailmodal() {
    const modalRef = this.modalService.open(PublicatinDetailsModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  public modalRefUpdate: NgbModalRef;
  openUpdatePubModal() {
    this.modalRefUpdate = this.modalService.open(this.updateModal, { size: 'lg' });

  }
  isLoggedIn() {
    this.authService.isLoggedIn();
  }
  showMe() {
    if (this.show == false) {
      this.show = true;
    }
    else {
      this.show = false
    }
  }


}
