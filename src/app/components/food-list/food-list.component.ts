import { FoodService } from './../../services/food.service';
import { Observable } from 'rxjs/Observable';
import { Food } from './../../classes/food';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit, AfterViewInit {
  food = <Food>{};
  displayedColumns = ['select', 'title', 'backdrop', 'author', 'postedAt'];
  dataSource = new MatTableDataSource();

  selectedCheckbox = [];
  selectedId = [];
  haveSelection = false;
  constructor(private foodService: FoodService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.foodService.getFoodList().subscribe(data => {
        this.dataSource.data = data;
    });
    this.dataSource.filterPredicate = (data: Food, filter: string) => data.alias.indexOf(filter) !== -1;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
    this.router.navigate(['/food/edit/' + this.food.id]);
  }

  addFood() {
    this.router.navigate(['/food/add']);
  }

}


