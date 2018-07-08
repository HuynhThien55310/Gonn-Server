import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  isLogin = true;
  ngOnInit() {
    this.auth.user$.subscribe(user => {
        if (user === undefined || user === null) {
          console.log(user);
          this.isLogin = false;
        } else {
          console.log(user);
          this.isLogin = true;
        }
    });
  }

  btnClick() {
    if (this.isLogin) {
      this.auth.signOut();
    } else {
      this.router.navigate(['login']);
    }
  }

  btnFood() {
    if (this.isLogin) {
      this.router.navigate(['food']);
    }
  }

  btnIngre() {
    if (this.isLogin) {
      this.router.navigate(['ingredient']);
    }
  }

  btnUser() {
    if (this.isLogin) {
      this.router.navigate(['user']);
    }
  }
}
