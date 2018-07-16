import { Ingredient } from './../../classes/ingredient';
import { Food } from './../../classes/food';
import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  tag = [];

  // ingredient table
  ingre = <Ingredient>{};
  units = [
    { value: 'kg', viewValue: 'kg' },
    { value: 'gram', viewValue: 'gram' },
    { value: 'chục', viewValue: 'chục' },
    { value: 'l', viewValue: 'l' },
    { value: 'ml', viewValue: 'ml' }
  ];
  dataSource = new MatTableDataSource<Ingredient>();
  displayedColumns = ['select', 'name', 'unit', 'amount'];
  ingreForm: FormGroup;
  selectedCheckbox = [];
  lastSelection = 0;
  haveSelection = false;

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tag: [[], Validators.required],
      backdrop: ['', Validators.required],
      ingreName: new FormControl('', Validators.required),
      ingreUnit: new FormControl('', Validators.required),
      ingreAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)
      ])
    });

    this.ingre.unit = this.units[1].value;
    this.ingreForm = new FormGroup({
      ingreName: new FormControl('', Validators.required),
      ingreUnit: new FormControl('', Validators.required),
      ingreAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)
      ]),
      checkbox: new FormControl(false)
    });
  }

  ngOnInit() {
    // if update
    this.route.params.subscribe((params: any) => (this.id = params.id));
    console.log(this.id);
    if (this.id !== undefined) {

      this.foodService.getFood(this.id).subscribe(food => {
        this.food = food;
        if (this.food.ingredients === undefined) {
          this.food.ingredients = new Array<Ingredient>();
        }

        for (const tag of Object.keys(this.food.tag)) {
          this.tag.push({display: tag,
                               value: tag});
        }
        console.log(this.tag);
        this.dataSource.data = this.food.ingredients;
      });
    } else {
      this.food.share = 0;
      this.food.like = 0;
      this.food.comment = 0;
      this.food.view = 0;
      this.food.ingredients = new Array<Ingredient>();
      this.ingre.unit = this.units[1].value;
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

  onSubmit() {
    this.food.alias = this.createAlias(this.food.title);
    this.food.ingreTag = {};
    for (let i = 0; i < this.food.ingredients.length; i++) {
      this.food.ingreTag[<any>this.food.ingredients[i].name] = true;
    }
    console.log(this.createAlias(this.food.title));
    if (this.id === undefined) {
      this.food.postedAt = new Date();
      // parse taginput to string array
      console.log(this.tag);
      this.food.tag = {};
      for (let i = 0; i < this.tag.length; i++) {
        this.food.tag[this.tag[i].value] = true;
      }
      console.log(this.food);
      this.foodService.addFood(this.food).then(result => {
        this.openDialog('Thêm thành công');
        this.clearContent();
      }).catch(error => {
        this.openDialog('Có lỗi xãy ra, xin kiểm tra lại');
    });
    } else {
      this.foodService.updateFood(this.food).then(result => {
        this.openDialog('Cập nhật thành công');
      }).catch(error => {
        this.openDialog('Có lỗi xãy ra, xin kiểm tra lại');
    });
    }
  }
  // image upload
  changeListener($event) {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.food.backdrop = myReader.result;
    };
    myReader.readAsDataURL(file);
    console.log(this.food.backdrop);
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
    console.log(this.food.ingredients);
    console.log(this.dataSource.data);
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
    this.selectedCheckbox = [];
    this.lastSelection = 0;
  }

  updateIngre() {
    this.food.ingredients[this.lastSelection] = this.ingre;
    this.dataSource.data = this.food.ingredients;
    this.ingre = <Ingredient>{};
    this.ingre.unit = this.units[1].value;
    this.selectedCheckbox = [];
    this.lastSelection = 0;
  }

  // dialog

  openDialog(message) {
    this.dialog.open(DialogComponent, {
        data: message
    });
  }

  clearContent() {
    this.ingre = <Ingredient>{};
    this.food = <Food>{};
    this.tag = [];
    this.food.share = 0;
    this.food.like = 0;
    this.food.comment = 0;
    this.food.view = 0;
    this.food.ingredients = new Array<Ingredient>();
    this.ingre.unit = this.units[1].value;
    this.dataSource.data = this.food.ingredients;
  }

}


@Component({
  selector: 'app-dialog',
  templateUrl: 'dialogTemplate.html'
})
export class DialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog() {
    this.matDialogRef.close();
  }

}

