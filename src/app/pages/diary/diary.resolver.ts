import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { selectPosts } from 'src/app/store/store.selectors';
import { fetchPosts, loading } from 'src/app/store/store.actions';


@Injectable()
export class DiaryResolver implements Resolve<any> {
  constructor(private _http: HttpClient, private store: Store<any>) {
   }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.store.dispatch(loading({payload: true}));
    this.store.dispatch(fetchPosts({ id: route.paramMap.get('id') }));
    return this.store.select(selectPosts)
  }


}