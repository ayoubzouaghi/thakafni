import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouveaute',
  templateUrl: './nouveaute.component.html',
  styleUrls: ['./nouveaute.component.scss']
})
export class NouveauteComponent implements OnInit {
public show:boolean=false
public show1:boolean=false
public show2:boolean=false
public show3:boolean=false
public show4:boolean=false
public show5:boolean=false


  constructor() { }

  ngOnInit() {
  }

showMe(){
  if(this.show==false){
this.show=true;}
else{
  this.show=false
}
}
showMe1(){
  if(this.show1==false){
this.show1=true;}
else{
  this.show1=false
}
}
showMe2(){
  if(this.show2==false){
this.show2=true;}
else{
  this.show2=false
}
}
showMe3(){
  if(this.show3==false){
this.show3=true;}
else{
  this.show3=false
}
}
showMe4(){
  if(this.show4==false){
this.show4=true;}
else{
  this.show4=false
}
}
showMe5(){
  if(this.show5==false){
this.show5=true;}
else{
  this.show5=false
}
}
}

