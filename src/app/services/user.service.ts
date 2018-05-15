import { User } from './../classes/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Injectable()
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userItem: AngularFirestoreDocument<User>;
  constructor(private afs: AngularFirestore,
    private router: Router) {
      this.userCollection = this.afs.collection('users');
    }


  updateUser(user) {
    return this.afs.doc<User>('users/' + user.uid).update(user);
  }

  getUserList() {
    return this.afs.collection('users', ref => ref.orderBy('email', 'asc')).valueChanges();
  }

}
