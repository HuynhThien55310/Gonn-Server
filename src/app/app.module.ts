import { IngredientService } from './services/ingredient.service';
import { EditFoodComponent } from './components/edit-food/edit-food.component';
import { FoodService } from './services/food.service';
import { FoodListComponent } from './components/food-list/food-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import { QuillModule } from 'ngx-quill';
import { MatInputModule, MatFormFieldModule, MatTableModule, MatButtonModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { MatCheckboxModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { DialogComponent } from './components/add-food/add-food.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
TagInputModule.withDefaults({
  tagInput: {
    secondaryPlaceholder: 'Nhập loại món ăn'
  }
});

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    FoodListComponent,
    HomeComponent,
    NavbarComponent,
    AddFoodComponent,
    AddIngredientComponent,
    EditFoodComponent,
    DialogComponent,
    UserComponent

  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    TagInputModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    QuillModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [AuthService, FoodService, IngredientService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
