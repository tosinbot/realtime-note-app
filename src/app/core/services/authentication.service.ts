import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userDetails: any;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (!user) {
        localStorage.removeItem('user');
        return this.router.navigate(['/']);
      }

      const { uid, displayName, photoURL, email } = user;
      const userDetails = { uid, displayName, photoURL, email };
      localStorage.setItem('user', JSON.stringify(userDetails));
      return this.router.navigate(['/editor']);
    });
  }

  authenitcateUser(): Observable<boolean> {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return new Observable((observer) => {
      this.angularFireAuth.signInWithRedirect(googleProvider)
        .catch((error) => {
          console.error(error);
          window.alert('An error occured, Please try later');
          observer.next(false);
        });
    });
  }

  getAuthUser(): User {
    const loggedInUser = localStorage.getItem('user') || '{}';
    return JSON.parse(loggedInUser);
  }

  LogOut(): void {
    this.angularFireAuth.signOut()
      .catch((error) => {
        console.error(error);
        window.alert('An error occured, Please try later');
      });
    localStorage.removeItem('loggingIn');
    localStorage.removeItem('user');
  }
}
