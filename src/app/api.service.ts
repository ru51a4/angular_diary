import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { GlobalService } from "./global.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { SetUser } from "./store/store.actions";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "http://laraveldiary.1123875-cc97019.tw1.ru/api";

  constructor(public global: GlobalService, public store: Store<any>, private http: HttpClient, private router: Router) {
  }

  public userToken :any = ""

  setUserToken(token: any) {
    this.userToken = token
  }

 

  registerUser(email: any, password: any, name: any): any {
    let body = { email, password, name };
    return this.http.post(`${this.apiUrl}/register`, body)
  }

  loginUser(email: any, password: any) {
    let body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body)
  }
  async auth(data: any = {}) {
    if (data?.token) {
      this.userToken = data.token;
      localStorage.setItem("jwt", this.userToken);
    } else if (localStorage.getItem("jwt")) {
      this.userToken = localStorage.getItem("jwt");
    }
    let check: any = await this.http.post(`${this.apiUrl}/get_user`, { token: this.userToken }).toPromise();
    if (check?.user?.name) {
      console.log({check})
      this.store.dispatch(SetUser(check.user));
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.setItem("jwt", "")
    this.userToken = '';
    this.router.navigate(['/login'])
  }

  getDashboard(page: any): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.get(`${this.apiUrl}/dashboard/${page}`, requestOptions)
  }

  getDiary(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.get(`${this.apiUrl}/diary/${id}`, requestOptions)
  }

  addPost(idDiary: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/createpost/${idDiary}`, { message }, requestOptions)
  }

  createDiary(name: any, desc: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/creatediary`, { name, desc }, requestOptions)
  }

  editPost(idPost: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/editpost/${idPost}`, { message }, requestOptions)
  }

  deletePost(idPost: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/deletepost/${idPost}`, {}, requestOptions)
  }

  updateUser(avatar: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/updateuser`, { avatar }, requestOptions)

  }
  getPost(postId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.post(`${this.apiUrl}/getpost/${postId}`, {}, requestOptions)

  }
}
