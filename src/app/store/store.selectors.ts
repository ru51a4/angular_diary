import { createFeatureSelector, createSelector } from "@ngrx/store";


export const selectDiarys = createFeatureSelector<any[]>('diarys');
export const selectPosts = createFeatureSelector<any[]>('posts');
export const selectUser = createFeatureSelector<any>('user');
