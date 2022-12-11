import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  userName = new Subject<String>();
  userAvatar = new Subject<String>();

  setUserName(name: any) {
    this.userName.next(name);
  }
}
