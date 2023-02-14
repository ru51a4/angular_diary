import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../api.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { LoginUser, RegisterUser } from "./../../store/store.actions"
import { selectUser } from 'src/app/store/store.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user$: Observable<any>;
  constructor(public api: ApiService, private router: Router, public store: Store<any>) {
    this.user$ = this.store.select(selectUser);
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('')
  });
  isRegister = false;
  isLogin = false;
  get _email(): any {
    return this.loginForm.get('email')
  }

  get _password(): any {
    return this.loginForm.get('password')
  }

  register() {
    this.isRegister = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let name = this.loginForm.value.name;
    this.store.dispatch(RegisterUser({ name, email, password }))
  }

  login() {
    this.isLogin = true;
    this.loginForm.controls.email.markAsDirty();
    this.loginForm.controls.password.markAsDirty();
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.store.dispatch(LoginUser({ email, password }));
  }
}
