import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { fetchDiarys } from './store.actions';
@Injectable()
export class StoreEffects {
    // Listen for the 'LOGIN' action

    constructor(private http: HttpClient, private actions$: Actions, public api: ApiService) { }


    diary$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[Dashboard Component] Fetch diarys'),
            switchMap((params: any) => this.api.getDashboard(params.id)
              .pipe(
                map(data => ({ type: '[Dashboard Component] Load diarys', payload: data })),
                catchError(() => EMPTY)
              ))
            )
    });

    posts$ = createEffect((): any => {
      return this.actions$.pipe(
          ofType('[Diary Component] Fetch posts'),
          switchMap((params: any) => this.api.getDiary(params.id)
            .pipe(
              map(data => ({ type: '[Diary Component] Load posts', payload: data })),
              catchError(() => EMPTY)
            ))
          )
  });
}