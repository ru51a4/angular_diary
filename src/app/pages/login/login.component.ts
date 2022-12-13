import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from "../../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public api: ApiService, private router: Router) {
    this.isRegister = false;
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl('')
  });
  isRegister = false;

  register() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let name = this.loginForm.value.name;
    this.api.registerUser(email, password, name).subscribe((data: any) => {
      if (data.success) {
        this.isRegister = true;
      }
    })
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.api.loginUser(email, password).subscribe((data: any) => {
      if (data) {
        this.router.navigate(['']);
      }
    })
  }
}
