import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IngredientService } from './../../services/ingredient.service';
import { Ingredient } from './../../classes/ingredient';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
export class AddIngredientComponent implements OnInit, AfterViewInit {
  ingre = <Ingredient>{};

  units = [
    { value: 'kg', viewValue: 'kg' },
    { value: 'gram', viewValue: 'gram' },
    { value: 'chục', viewValue: 'chục' },
    { value: 'l', viewValue: 'l' },
    { value: 'ml', viewValue: 'ml' }
  ];
  displayedColumns = ['select', 'name', 'price', 'unit', 'amount'];
  dataSource = new MatTableDataSource();
  ingreForm: FormGroup;
  selectedCheckbox = [];
  selectedId = [];
  haveSelection = false;

  constructor(private ingreService: IngredientService) {}

    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

  ngOnInit() {
    this.ingreService.getIngreList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.filterPredicate = (data: Ingredient, filter: string) => data.alias.indexOf(filter) !== -1;

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

  createAlias(title) {
    let str = title;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\'|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/ + /g, ' ');
    str = str.replace(/ /g, '');
    return str;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addIngre() {
    this.ingre.alias = this.createAlias(this.ingre.name);
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
    this.ingre.alias = this.createAlias(this.ingre.name);
    this.ingreService.updateIngre(this.ingre);
  }
}

