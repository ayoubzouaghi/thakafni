import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../Model/User.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Publication } from '../../Model/Publication.model';
import { PublicationService } from '../../services/publication/publication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User[];
  pub: Publication[]
  list:Publication[]
  id:Publication
  constructor(public authService:AuthService,public afs:AngularFirestore,private pubservice: PublicationService,) { }
  

  ngOnInit() {
    this.pubservice.getpub().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
    });
  }
  
delete(){
  this.pubservice.onDelete()
}
}
