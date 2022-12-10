import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {GlobalService} from "./global.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "http://laraveldiary.1123875-cc97019.tw1.ru";

  constructor(public global: GlobalService, private http: HttpClient, private router: Router) {
  }

  public userToken = ""

  setUserToken(token: any) {
    this.userToken = token
  }

  async check() {
    let data: any = await this.http.post(`${this.apiUrl}/api-get_user`, {token: this.userToken}).toPromise();
    if (data?.user?.name) {
      this.global.setUserName(data.user.name);
    } else {
      this.logout();
    }

  }

  registerUser(email: any, password: any, name: any): any {
    let body = {email, password, name};
    return this.http.post(`${this.apiUrl}/api-register`, body)
  }

  loginUser(email: any, password: any) {
    let body = {email, password};
    const check$ = new Subject();
    this.http.post(`${this.apiUrl}/api-login`, body).subscribe((data: any) => {
      if (data.success) {
        this.userToken = data.token;
        localStorage.setItem("jwt", this.userToken)
        check$.next(true);
      }
      check$.next(false);
    });
    return check$
  }

  logout() {
    localStorage.setItem("jwt", "")
    this.global.setUserName("")
    this.userToken = '';
    this.router.navigate(['/login'])
  }

  getDashboard(page: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.get(`${this.apiUrl}/api-dashboard/${page}`, requestOptions)
  }

  getDiary(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.get(`${this.apiUrl}/api-diary/${id}`, requestOptions)
  }

  addPost(idDiary: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/api-createpost/${idDiary}`, {message}, requestOptions)
  }

  createDiary(name: any, desc: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/api-creatediary`, {name, desc}, requestOptions)
  }

  editPost(idPost: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/api-editpost/${idPost}`, {message}, requestOptions)
  }

  deletePost(idPost: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/api-deletepost/${idPost}`, {}, requestOptions)
  }
}
