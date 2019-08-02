export class Publication {
uid:string;
categorie: Array<string>;
titrelivre:string;
auteur:string;
type_annonce:string;  //vente, emprunt, echange [0: echange, 1: emprunt, 2: vente]
langue:string; 
adresse:string; 
ville:string; 
code_postale:number;
description:string;
edition:string;
user_id : string; // id de l'utilisateur qui a publié l'annonce 
}