import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {GlobalService} from "./global.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "http://laraveldiary.1123875-cc97019.tw1.ru/api";

  constructor(public global: GlobalService, private http: HttpClient, private router: Router) {
  }

  public userToken = ""

  setUserToken(token: any) {
    this.userToken = token
  }

  async check() {
    let data: any = await this.http.post(`${this.apiUrl}/get_user`, {token: this.userToken}).toPromise();
    if (data?.user?.name) {
      this.global.setUser(data.user);
    } else {
      this.logout();
    }

  }

  registerUser(email: any, password: any, name: any): any {
    let body = {email, password, name};
    return this.http.post(`${this.apiUrl}/register`, body)
  }

  loginUser(email: any, password: any) {
    let body = {email, password};
    const check$ = new Subject();
    this.http.post(`${this.apiUrl}/login`, body).subscribe((data: any) => {
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
    this.global.setUser(null)
    this.userToken = '';
    this.router.navigate(['/login'])
  }

  getDashboard(page: any) : any {
    console.log(page)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.get(`${this.apiUrl}/dashboard/${page}`, requestOptions)
  }

  getDiary(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.get(`${this.apiUrl}/diary/${id}`, requestOptions)
  }

  addPost(idDiary: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/createpost/${idDiary}`, {message}, requestOptions)
  }

  createDiary(name: any, desc: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/creatediary`, {name, desc}, requestOptions)
  }

  editPost(idPost: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/editpost/${idPost}`, {message}, requestOptions)
  }

  deletePost(idPost: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/deletepost/${idPost}`, {}, requestOptions)
  }

  updateUser(avatar: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/updateuser`, {avatar}, requestOptions)

  }
  getPost(postId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    });
    const requestOptions = {headers: headers};
    return this.http.post(`${this.apiUrl}/getpost/${postId}`, {}, requestOptions)

  }
}
