import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Content } from '../../shared/interfaces/content';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private firestore: AngularFirestore) { }

  getContentByUid(uid: string): Observable<firebase.firestore.DocumentData> {
    return this.firestore
      .collection('contents')
      .doc(uid)
      .get();
  }

  writeContent(data: Content): Promise<void> {
    const { uid, content, modified } = data;
    return this.firestore
      .collection('contents')
      .doc(uid)
      .set({ content, modified })
      .catch((error) => {
        console.log(error);
        window.alert('Something went wrong. Try again.');
      });
  }
}
