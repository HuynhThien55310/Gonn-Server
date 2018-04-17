import { Ingredient } from './../../classes/ingredient';
import { Food } from './../../classes/food';
import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  form: FormGroup;
  id: undefined;
  food = <Food>{};
  tags = [];
  message = '';

  // ingredient table
  ingre = <Ingredient>{};
  units = [
    { value: 'kg', viewValue: 'kg' },
    { value: 'gram', viewValue: 'gram' },
    { value: 'chục', viewValue: 'chục' }
  ];
  dataSource = new MatTableDataSource<Ingredient>();
  displayedColumns = ['select', 'name', 'unit', 'amount'];
  ingreForm: FormGroup;
  selectedCheckbox = [];
  lastSelection = 0;
  haveSelection = false;

  constructor(private formBuilder: FormBuilder, private foodService: FoodService) {

  }


  ngOnInit() {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [[], Validators.required],
      backdrop: ['', Validators.required],
      ingreName: new FormControl('', Validators.required),
      ingreUnit: new FormControl('', Validators.required),
      ingreAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
    });

    this.ingre.unit = this.units[1].value;
    this.ingreForm = new FormGroup({
      ingreName: new FormControl('', Validators.required),
      ingreUnit: new FormControl('', Validators.required),
      ingreAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      checkbox: new FormControl(false, ),
    });

    this.food.share = 0;
    this.food.like = 0;
    this.food.comment = 0;
    this.food.view = 0;
    this.food.postedAt = new Date();
    this.food.ingredients = new Array<Ingredient>();
    this.ingre.unit = this.units[1].value;

  }


  onSubmit() {
    // parse taginput to string array
    console.log(this.tags);
    this.food.tags = {};
    for (let i = 0; i < this.tags.length; i++) {
        // temp.push(this.tags[i].value);
        this.food.tags[this.tags[i].value] = true;
        // this.food.tags.
    }
    // for (let i = 0; i < this.food.ingredients.length; i++) {
    //     const name = this.food.ingredients[i].name;
    //     const amount = this.food.ingredients[i].amount;
    //     if (name === '' || amount === '') {

    //     }
    // }
    console.log(this.food);
    // this.foodService.addFood(this.food);

  }
  // image upload
  changeListener($event) {
    this.readThis($event.target);
  }



  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.food.backdrop = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  // ingredient
  cellCheckToggle(row, index) {
    this.ingre = row;
    this.haveSelection = false;
    if (this.selectedCheckbox[index]) {
      this.lastSelection = index;
    }
    for (const i in this.selectedCheckbox) {
      if (this.selectedCheckbox[i]) {
        this.haveSelection = true;
      }
    }
  }



  addIngre() {
    this.food.ingredients.push(this.ingre);
    this.dataSource.data = this.food.ingredients;
    this.ingre = <Ingredient>{};
    this.ingre.unit = this.units[1].value;
  }

  deleteIngre() {
    for (let _i = 0; _i < this.selectedCheckbox.length; _i++) {
        if (this.selectedCheckbox[_i]) {
            this.food.ingredients.splice(_i, 1);
            this.selectedCheckbox[_i] = false;
        }
    }
    this.dataSource.data = this.food.ingredients;
    this.haveSelection = false;
    this.ingre = <Ingredient>{};
    this.ingre.unit = this.units[1].value;
  }

  updateIngre() {
    this.food.ingredients[this.lastSelection] = this.ingre;
    this.dataSource.data = this.food.ingredients;
    this.ingre = <Ingredient>{};
    this.ingre.unit = this.units[1].value;
  }
}
