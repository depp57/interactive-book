import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private pagesCollection: AngularFirestoreCollection<Page>;

  constructor(private storage: AngularFirestore) {
    this.pagesCollection = this.storage.collection<Page>('pages');
  }

  countPages(): Observable<number[]> {
    return this.pagesCollection.get().pipe(
      map(snap => [...Array(snap.size).keys()]),
      shareReplay()
    );

    // return this.pagesCollection.valueChanges().pipe(
    //   map(pages => {
    //     return [...Array(pages.length).keys()];
    //   }),
    //   shareReplay()
    // );
  }

  getPageContent(pageNumber: number): Observable<Page | undefined> {
    return this.pagesCollection.doc(`${pageNumber}`).valueChanges();
  }
}

export interface Page {
  text?: string;
}
