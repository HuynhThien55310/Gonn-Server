import { Food } from './../../classes/food';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  food: Food;
  tags = [];
  message = '';
  constructor(private formBuilder: FormBuilder, private foodService: FoodService,  private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [[], Validators.required],
      backdrop: ['', Validators.required]
    });
  }


  ngOnInit() {
    // // if update
    // this.route.params.subscribe((params: any) => this.id = params.id);
    // console.log(this.id);
    // if (this.id !== undefined) {
    //   this.foodService.getPost(this.id).subscribe(res => {
    //     this.food = res.food;
    //     for (let i = 0; i < this.food.type.length; i++) {
    //       this.type.push({display: this.food.type[i],
    //                       value: this.food.type[i]});
    //   }
    //   });
    // }
  }

  onSubmit() {
    // parse taginput to string array
    console.log(this.tags);
    for (let i = 0; i < this.tags.length; i++) {
        // temp.push(this.tags[i].value);
        this.food.tags[this.tags[i]] = true;
    }
    console.log(this.food);
    if (this.id !== undefined) {
        // update post
      // this.foodService.updatePost(this.food, this.id).subscribe(res => {
      //   if (res.success) {
      //     this.message = 'Chỉnh sửa thành công';
      //   } else {
      //     this.message = 'Chỉnh sửa thất bại';
      //   }
      // });
    } else {
      // create post
      this.foodService.addFood(this.food);
    }
  }
}
