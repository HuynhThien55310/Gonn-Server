import { User } from './../../classes/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email không được trống.',
      'email':         'Email sai định dạng.'
    },
    'password': {
      'required':      'Mật khẩu không được trống.'
    }
  };

  user: User;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  login(): void {
    this.auth.emailLogin(this.loginForm.value);
    this.auth.user$.subscribe(user => {
      if (this.auth.canDelete(user)) {
          console.log('admin');
      }
    });

  }


  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.required
      ]
    ],
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }


  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field of Object.keys(this.formErrors)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key of  Object.keys(control.errors)) {
           this.formErrors[field] += messages[key] + ' ';
         }
       }
    }
  }


}
