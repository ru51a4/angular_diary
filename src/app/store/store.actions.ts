import { createAction,props } from '@ngrx/store';

export const fetchDiarys = createAction('[Dashboard Component] Fetch diarys', props<any>());
export const loadDiarys = createAction('[Dashboard Component] Load diarys', props<any>());

export const fetchPosts = createAction('[Diary Component] Fetch posts', props<any>());
export const loadPosts = createAction('[Diary Component] Load posts', props<any>());
