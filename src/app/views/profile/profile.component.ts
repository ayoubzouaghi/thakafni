import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Publication } from '../../Model/Publication.model';
import { PublicationService } from '../../services/publication/publication.service';
import { Upload } from '../../Model/Upload.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditProfilPictureModalComponent } from '../edit-profil-picture-modal/edit-profil-picture-modal.component';
import { PublicatinDetailsModalComponent } from '../publicatin-details-modal/publicatin-details-modal.component';
import { User } from '../../Model/User.model';
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
  public user ;
  publication: Publication[] = [];
  fileUploads: any[];
  public isLogged: Boolean;
  public show: boolean = false

  id: Publication
  selectedFiles: FileList;
  currentFileUpload: Upload;

  public selectedPublication: any;
  progress: { percentage: number } = { percentage: 0 };



  constructor(public authService: AuthService,
    public afs: AngularFirestore,
    private pubservice: PublicationService,
    private modalService: NgbModal) {
    // this.user = JSON.parse(localStorage.getItem('user'));

    this.user = this.authService.afAuth.authState;
      // console.log(this.authService.);
    this.user.subscribe((auth) => {

      if (auth) {

        this.isLogged = true;


        console.log('Connecté');
        console.log(auth);
        this.user = {
          uid: auth.uid,
          email: auth.email,
          displayName: auth.displayName
        }



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
    // this.pubservice.getPublicationByUser()
    this.pubservice.getPublication()
      .subscribe(actionArray => {
        this.publication = actionArray.map(item => {
          return {
            uid: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Publication;
        })
      });




    // Use snapshotChanges().map() to store the key
    this.displayImg = this.authService.getUploads(0)
    console.log(this.displayImg)
  }


  getuser() {

    this.authService.getuserbyid();
  }
  updatePublication(publication: Publication) {
    console.log(publication)
    this.pubservice.updatePub(publication);
    this.modalRefUpdate.close();
  }


  updateUser(data) {
    console.log(data)
    this.authService.updateUser(data);
    this.modalRefUpdateUser.close()
  }


  onDelete(publication) {
    this.pubservice.deletePub(publication);
    this.modalRefDelete.close();
    this.delete.emit(publication);


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
  openUpdatePubModal(data: Publication) {

    this.selectedPublication = data;

    setTimeout(() => {
      this.modalRefUpdate = this.modalService.open(this.updateModal, { size: 'lg' });
    }, 300);

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
