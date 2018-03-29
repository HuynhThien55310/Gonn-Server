import { FoodService } from './services/food.service';
import { FoodListComponent } from './components/food-list/food-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { CKEditorModule } from 'ng2-ckeditor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagInputModule } from 'ngx-chips';

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
    AddFoodComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    TagInputModule,
    CKEditorModule,
    InfiniteScrollModule
  ],
  providers: [AuthService, FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
