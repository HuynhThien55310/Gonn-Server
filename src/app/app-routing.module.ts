import { FoodListComponent } from './components/food-list/food-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'test',
    component: FoodListComponent
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
