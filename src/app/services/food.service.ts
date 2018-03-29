import { Food } from './../classes/food';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Injectable()
export class FoodService {

  constructor(private afs: AngularFirestore,
    private router: Router) {

    }

  addFood(food) {
    return this.afs.collection('foods').add(food)
    .then(res => {
        console.log(res);
    }).catch(error => console.log(error));
  }
}
