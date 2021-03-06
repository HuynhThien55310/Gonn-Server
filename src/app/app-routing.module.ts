import { AdminGuard } from './guards/admin.guard';
import { AuthorGuard } from './guards/author.guard';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';


const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent, canActivate: [AdminGuard]
  },
  {
    path: 'ingredient',
    component: AddIngredientComponent, canActivate: [AuthorGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'food',
    component: FoodListComponent, canActivate: [AuthorGuard]
  },
  {
    path: 'food/edit/:id',
    component: AddFoodComponent, canActivate: [AuthorGuard]
  },
  {
    path: 'food/add',
    component: AddFoodComponent, canActivate: [AuthorGuard]
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
