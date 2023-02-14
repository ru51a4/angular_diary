import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../api.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { LoginUser, RegisterUser } from "./../../store/store.actions"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public api: ApiService, private router: Router, public store: Store<any>) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('') 
  });
  isRegister = false;

  register() {
    this.isRegister = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let name = this.loginForm.value.name;
    this.store.dispatch(RegisterUser({ name, email, password }))
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.store.dispatch(LoginUser({ email, password }));
  }
}
