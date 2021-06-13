import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Page } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private pagesCollection: AngularFirestoreCollection<Page>;

  constructor(private storage: AngularFirestore) {
    this.pagesCollection = this.storage.collection<Page>('pages');
  }

  publishSuggestion(lastPageNumber: number, sentence: string): any {
    this.pagesCollection.doc(`${lastPageNumber}`).get().subscribe(
      value => {
        if (value.exists) {
          let text = value.data()?.text;

          if (text && text.length < 600) {
            if (!text.endsWith('.')) {
              text += '.';
            }
            this.pagesCollection.doc(`${lastPageNumber}`).set({text: text + ' ' + sentence});
          }
          else {
            this.pagesCollection.doc(`${lastPageNumber + 1}`).set({text: sentence});
          }
        }
      }
    );
  }
}
