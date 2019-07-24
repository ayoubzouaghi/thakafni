import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { PublicationService } from '../../services/publication/publication.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
rechercheform:FormGroup;
displaylist=false;
  constructor(public fb:FormBuilder,public pubservice:PublicationService) { }

  ngOnInit() {
    this.rechercheform = this.fb.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
     
    })
  }

  recherchelivre(){
    this.displaylist=true;
  }
}
