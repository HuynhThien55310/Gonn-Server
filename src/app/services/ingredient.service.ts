import { Ingredient } from './../classes/ingredient';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
@Injectable()
export class IngredientService {
  ingreCollection: AngularFirestoreCollection<Ingredient>;
  ingres: Observable<Ingredient[]>;
  constructor(private afs: AngularFirestore,
    private router: Router) {
    this.ingreCollection = this.afs.collection('ingredients');
   }

   addIngre(ingre) {
    return this.ingreCollection.add(ingre)
    .then(res => {
      ingre.id = res.id;
      res.update(ingre);
    }).catch(error => console.log(error));
  }

  getIngreList() {
    return this.afs.collection('ingredients', ref => ref.orderBy('name')).valueChanges();
  }

  deleteIngre(id) {
    return this.ingreCollection.doc(id).delete();
  }

  updateIngre(ingre) {
    return this.ingreCollection.doc(ingre.id).update(ingre);
  }

}
