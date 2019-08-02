import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {

  itemName = '';
      itemEmail = '';
      itemSubject = '';
      itemMessage = '';
      items: Observable<any[]>;
      contactForm: FormGroup;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase,public afs:AngularFirestore) { 
  this.items = this.db.list('messages').valueChanges()
  // Passing in MD_Bootstrap form validation 
          this.contactForm = fb.group({
          contactFormName: ['', Validators.required],
          contactFormEmail: ['', [Validators.required, Validators.email]],
          contactFormSubject: ['', Validators.required],
          contactFormMessage: ['', Validators.required]
       });
      }
    // Pushing the contact-form to the firebase data base
         onSubmit()  {
         this.afs.collection('messages').add({ nom: this.itemName, email: this.itemEmail, sujet: this.itemSubject, 
         message: this.itemMessage});
  //Popup message
         alert('Merci de nous avoir contacté, votre message est passé!!')
        }
     
  // Clearing the form after submit
   clearForm() {
           this.contactForm.reset();
          }
        }