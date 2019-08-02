import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Upload } from '../Model/Upload.model';
import { AuthService } from '../services/Auth/auth.service';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-edit-profil-picture-modal',
  templateUrl: './edit-profil-picture-modal.component.html',
  styleUrls: ['./edit-profil-picture-modal.component.scss']
})
export class EditProfilPictureModalComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: Upload;
  uploadPic : AngularFireList<Upload>;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public activeModal: NgbActiveModal, public authService:AuthService,) { }

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

  selectFile(event) {
    console.log(event)
    const file = event.target.files.item(0);
  console.log(file)
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
 
  upload() {
    console.log(this.selectedFiles)
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    
    this.currentFileUpload = new Upload(file);
    console.log(this.currentFileUpload.url)
    this.authService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
  getUpload()
  {
    console.log(this.uploadPic)
    this.uploadPic = this.authService.getUploads(0)
  }
}
