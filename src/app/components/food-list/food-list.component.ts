import { FoodService } from './../../services/food.service';
import { Observable } from 'rxjs/Observable';
import { Food } from './../../classes/food';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  food = <Food>{};
  displayedColumns = ['select', 'title', 'backdrop', 'author', 'postedAt'];
  dataSource = new FoodDataSource(this.foodService);
  selectedCheckbox = [];
  selectedId = [];
  haveSelection = false;
  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit() {
  }

  cellCheckToggle(row, index) {
    this.food = row;
    this.haveSelection = false;
    this.selectedId[index] = row.id;
    for (const i in this.selectedCheckbox) {
      if (this.selectedCheckbox[i]) {
        this.haveSelection = true;
      }
    }
  }

  deleteFood() {
    for (const i in this.selectedCheckbox) {
        if (this.selectedCheckbox[i]) {
            this.foodService.deleteFood(this.selectedId[i]);
            this.selectedCheckbox[i] = false;
        }
    }
    this.haveSelection = false;
    this.food = <Food>{};
  }

  updateFood() {
    this.router.navigate(['/add-food/' + this.food.id]);
  }

  addFood() {
    this.router.navigate(['/add-food']);
  }

}

export class FoodDataSource extends DataSource<any> {
  foodList: Observable<{}[]>;
  length = 0;
  constructor(private foodService: FoodService) {
    super();
  }
  connect() {
    this.foodList = this.foodService.getFoodList();
    this.foodList.subscribe(result => {
      this.length = result.length;
    });
    return this.foodList;
  }

  disconnect() {}
}
