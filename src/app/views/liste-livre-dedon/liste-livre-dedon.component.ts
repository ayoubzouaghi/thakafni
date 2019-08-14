import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication/publication.service';
import { Don } from '../../Model/Don.model';

@Component({
  selector: 'app-liste-livre-dedon',
  templateUrl: './liste-livre-dedon.component.html',
  styleUrls: ['./liste-livre-dedon.component.scss']
})
export class ListeLivreDedonComponent implements OnInit {
  lists:Don[]
  constructor(public pubservice:PublicationService,) { }

  ngOnInit() {
    //this.pubservice.getlivredon().subscribe(actionArray => {
     // this.lists = actionArray.map(item => {
      //  return {
      //    titre: item.payload.doc.id,
      //    ...item.payload.doc.data()
     //   } as Don;
    //  })
  //  });
  }
  
}
