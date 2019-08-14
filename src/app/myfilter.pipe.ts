import { Pipe, PipeTransform } from '@angular/core';
import { Publication } from './Model/Publication.model';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(publication:Publication[],filtertext:string): Publication[] {
   
if (!publication || !filtertext){
  return publication;
}
return publication.filter(publication=>
  publication.titrelivre.toLowerCase().indexOf(filtertext.toLowerCase())!== -1);

    }
  }


