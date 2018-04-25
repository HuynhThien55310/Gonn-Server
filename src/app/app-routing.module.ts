import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
  {
    path: 'ingredient',
    component: AddIngredientComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'food',
    component: FoodListComponent
  },
  {
    path: 'food/edit/:id',
    component: AddFoodComponent
  },
  {
    path: 'food/add',
    component: AddFoodComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
