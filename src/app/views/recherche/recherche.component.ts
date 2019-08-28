import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PublicationService } from '../../services/publication/publication.service';
import { Publication } from '../../Model/Publication.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  
  rechercheform: FormGroup;
  publication: Publication[]
  pubs: Publication
  titrelivre: string;
  filtertext: string;
  auteursearch: string
  testi: boolean
  public hidden: boolean = true
  constructor(public fb: FormBuilder, public pubservice: PublicationService, public firestore: AngularFirestore) { }

  ngOnInit() {

    this.rechercheform = this.fb.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      categorie: ['', [Validators.required]],

    });
    this.pubservice.getPublication().subscribe(actionArray => {
      this.publication = actionArray.map(item => {
        return {
          uid: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Publication;
      })
    });
  }


  pub = this.firestore.collection('publication');

  rechercher() {


    this.pubservice.getPublication();


  }
  search() {

    this.publication = this.publication.filter(res => {
      return res.titrelivre.toLocaleUpperCase().match(this.titrelivre.toLocaleLowerCase());
    });

  }

  toggleResults(event) {
    
    if (event.target.value.length == 0) {
      this.hidden = true
    }else{
      this.hidden=false
    }
  }  /*test(){
    if (this.filtertext.length==null){
      this.testi=false
  }else{
    this.testi= true;
  }
  return this.testi
}
*/
}
