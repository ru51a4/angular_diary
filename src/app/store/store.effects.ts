import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { loading, fetchDiarys } from './store.actions';
import { Router } from '@angular/router';
@Injectable()
export class StoreEffects {

  constructor(private http: HttpClient, private actions$: Actions, public router: Router, public store: Store<any>, public api: ApiService) { }


  diarys$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Dashboard Component] Fetch diarys'),
      mergeMap((params: any) => this.api.getDashboard(params.id)
        .pipe(
          tap(() => this.store.dispatch(loading({ payload: false }))),
          map(data => ({ type: '[Dashboard Component] Load diarys', payload: data })),
          catchError(() => EMPTY)
        ),
      )
    )
  });

  posts$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Diary Component] Fetch posts'),
      switchMap((params: any) => this.api.getDiary(params.id)
        .pipe(
          tap(() => this.store.dispatch(loading({ payload: false }))),
          map(data => ({ type: '[Diary Component] Load posts', payload: data })),
          catchError(() => EMPTY)
        ))
    )
  });
  diary$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Adddiary Component] Create diary'),
      switchMap((params: any) => this.api.createDiary(params.name, params.desc).pipe(
        map(data => data),
        tap((data: any) => this.router.navigate(
          ['/diary', data.id]
        )))
      ))
  });

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Login Component] login'),
      switchMap((params: any) => this.api.loginUser(params.email, params.password).pipe(
        tap(async (data: any) => {
          await this.api.auth(data)
          this.router.navigate(["/dashboard"]);
        }),
        catchError(() => of({ type: '[Login Component] Set User', status: "fail" }))
      )
      ))

  });
  register$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Login Component] register'),
      switchMap((params: any) => this.api.registerUser(params.email, params.password, params.name).pipe(
        map((data: any) => {
          return { type: '[Login Component] login', email: params.email, password: params.password }
        }))
      ))
  });
  updateUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Cabinet Component] Update user'),
      switchMap((params: any) => this.api.updateUser(params.url).pipe(
        tap(async (data: any) => {
          this.router.navigate(["/"]);
        }))
      ))
  }, { dispatch: false });
  createPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Diary Component] Create post'),
      switchMap((params: any) => this.api.addPost(params.id, params.message)
        .pipe(
          map(data => {
            return { type: '[Diary Component] Fetch posts', id: params.diaryId }
          }),
          catchError(() => EMPTY)
        ))
    )
  });
  getPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Diary Component] Get post'),
      switchMap((params: any) => this.api.getPost(params.id)
        .pipe(
          map(data => ({ type: '[Diary Component] Load post', payload: data })),
          catchError(() => EMPTY)
        ))
    )
  });

  editPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Edit Component] Edit post'),
      switchMap((params: any) => this.api.editPost(params.id, params.message).pipe(
        tap(async (data: any) => {
          this.router.navigate(
            ['/diary', params.diaryId]
          );
        }),
        map(data => ({ type: '[Diary Component] Fetch posts', payload: data })),
      )
      ))
  }, { dispatch: false });

  deletePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Edit Component] Delete post'),
      switchMap((params: any) => this.api.deletePost(params.id).pipe(
        tap(async (data: any) => {
          if (params.is_op) {
            this.router.navigate(
              [''],
              {}
            );
          } else {
            this.router.navigate(
              ['/diary', params.diaryId]
            );
          }
        }),
        map(data => ({ type: '[Diary Component] Fetch posts', payload: data })),
      )
      ))
  }, { dispatch: false });

}