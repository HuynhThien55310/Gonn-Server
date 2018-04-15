import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IngredientService } from './../../services/ingredient.service';
import { Ingredient } from './../../classes/ingredient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  ingre = <Ingredient>{};

  units = [
    { value: 'kg', viewValue: 'kg' },
    { value: 'gram', viewValue: 'gram' },
    { value: 'chục', viewValue: 'chục' }
  ];
  displayedColumns = ['select', 'name', 'price', 'unit', 'amount'];
  dataSource = new IngredientDataSource(this.ingreService);
  ingreForm: FormGroup;
  selectedCheckbox = [];
  selectedId = [];
  haveSelection = false;

  constructor(private ingreService: IngredientService) {}

  ngOnInit() {
    this.ingre.unit = this.units[0].value;
    this.ingreForm = new FormGroup({
      name: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ])
    });
  }


  cellCheckToggle(row, index) {
    this.ingre = row;
    this.haveSelection = false;
    this.selectedId[index] = row.id;
    for (const i in this.selectedCheckbox) {
      if (this.selectedCheckbox[i]) {
        this.haveSelection = true;
      }
    }
  }



  addIngre() {
    this.ingreService.addIngre(this.ingre);
  }

  deleteIngre() {
    for (const i in this.selectedCheckbox) {
        if (this.selectedCheckbox[i]) {
            this.ingreService.deleteIngre(this.selectedId[i]);
            this.selectedCheckbox[i] = false;
        }
    }
    this.haveSelection = false;
    this.ingre = <Ingredient>{};
    this.ingre.unit = this.units[0].value;
  }

  updateIngre() {
    this.ingreService.updateIngre(this.ingre);
  }
}

export class IngredientDataSource extends DataSource<any> {
  ingreList: Observable<{}[]>;
  length = 0;
  constructor(private ingreService: IngredientService) {
    super();
  }
  connect() {
    this.ingreList = this.ingreService.getIngreList();
    this.ingreList.subscribe(result => {
      this.length = result.length;
    });
    return this.ingreList;
  }

  disconnect() {}
}
