import { Injectable } from '@angular/core';
import { Book } from '../../Model/Books.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;
    constructor(private db: AngularFireDatabase) { }

    AddBook(book: Book) {
      this.booksRef.push({
        book_name: book.book_name,
        isbn_10: book.isbn_10,
        author_name: book.author_name,
        publication_date: book.publication_date,
        binding_type: book.binding_type,
       
      })
      .catch(error => {
        this.errorMgmt(error);
      })
    }
  errorMgmt(error: any) {
    throw new Error("Method not implemented.");
  }
}
