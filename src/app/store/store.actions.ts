import { createAction,props } from '@ngrx/store';

export const fetchDiarys = createAction('[Dashboard Component] Fetch diarys', props<any>());
export const loadDiarys = createAction('[Dashboard Component] Load diarys', props<any>());

export const fetchPosts = createAction('[Diary Component] Fetch posts', props<any>());
export const loadPosts = createAction('[Diary Component] Load posts', props<any>());

export const createDiary = createAction('[Adddiary Component] Create diary', props<any>());

export const LoginUser = createAction('[Login Component] login', props<any>());
export const RegisterUser = createAction('[Login Component] register', props<any>());
export const SetUser = createAction('[Login Component] Set User', props<any>());

export const UpdateUser = createAction('[Cabinet Component] Update user', props<any>());

export const createPost = createAction('[Diary Component] Create post', props<any>());
export const getPost = createAction('[Diary Component] Get post', props<any>());
export const loadPost = createAction('[Diary Component] Load post', props<any>());

export const editPost = createAction('[Edit Component] Edit post', props<any>());
export const deletePost = createAction('[Edit Component] Delete post', props<any>());
