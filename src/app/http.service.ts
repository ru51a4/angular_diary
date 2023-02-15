import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, tap } from "rxjs";
import { GlobalService } from "./global.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { loading, SetUser } from "./store/store.actions";

@Injectable({
    providedIn: 'root'
})
export class HTTPService {
    constructor(public global: GlobalService, public store: Store<any>, private http: HttpClient, private router: Router) {

    }
    post(url: any, body: any, requestOptions: any = {}): any {
        this.store.dispatch(loading({ payload: true }));
        return this.http.post(url, body, requestOptions).pipe(tap(() => this.store.dispatch(loading({ payload: false }))))
    }
    get(url: any, requestOptions: any = {}): any {
        this.store.dispatch(loading({ payload: true }));
        return this.http.get(url, requestOptions).pipe(tap(() => this.store.dispatch(loading({ payload: false }))))
    }
}