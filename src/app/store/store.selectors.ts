import {createFeatureSelector} from "@ngrx/store";


export const selectDiarys = createFeatureSelector<any[]>('diarys');
export const selectPosts = createFeatureSelector<any[]>('posts');
