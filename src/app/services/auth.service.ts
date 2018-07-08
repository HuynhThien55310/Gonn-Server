import { User } from './../classes/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';


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
              console.log(user.uid);
               return this.afs.doc<User>('users/' + user.uid).valueChanges();
            } else {
              return Observable.of(null);
            }
        });

  }

  ///// Login


  emailLogin(credentials: EmailPasswordCredentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
               .then(() => {
                console.log('success');
                this.router.navigate(['food']);
              })
               .catch(error => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  ///// Role-based Authorization //////

canRead(user: User): boolean {
  const allowed = ['admin', 'editor', 'subscriber'];
  return this.checkAuthorization(user, allowed);
}

canEdit(user: User): boolean {
  const allowed = ['admin', 'editor'];
  return this.checkAuthorization(user, allowed);
}

canDelete(user: User): boolean {
  const allowed = ['admin'];
  return this.checkAuthorization(user, allowed);
}



// determines if user has matching role
private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  if (!user) {
    return false;
  }
  for (const role of allowedRoles) {
    if ( user.roles[role] ) {
      return true;
    }
  }
  return false;
}
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}
