import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../classes/user';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router) {
      //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
        .switchMap(user => {
            if (user) {
               return this.afs.doc<User>('users/${user.uid}').valueChanges();
            } else {
              return Observable.of(null);
            }
        });
  }

  ///// Login


  emailLogin(credentials: EmailPasswordCredentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
               .then(() => console.log('success'))
               .catch(error => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}
