import { Food } from './../classes/food';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Injectable()
export class FoodService {
  foodCollection: AngularFirestoreCollection<Food>;
  foods: Observable<Food[]>;
  constructor(private afs: AngularFirestore,
    private router: Router) {
      this.foodCollection = this.afs.collection('foods');
    }

  addFood(food) {
    return this.foodCollection.add(food)
    .then(res => {
      food.id = res.id;
      res.update(food);
    }).catch(error => console.log(error));
  }

  deleteFood(id) {
    return this.foodCollection.doc(id).delete();
  }

  getFoodList() {
    return this.afs.collection('foods', ref => ref.orderBy('postedAt')).valueChanges();
  }
}
