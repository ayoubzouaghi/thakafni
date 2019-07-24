import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
contactform:FormGroup;
  constructor(private formBuilder: FormBuilder,) { }
  ngOnInit(){
    this.initform();
  }
  initform(){
  this.contactform=this.formBuilder.group({
         email:['',[Validators.required,Validators.email]],
         message: ['', [Validators.required]],
    });
  }}