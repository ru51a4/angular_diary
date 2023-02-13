import { createReducer, on } from '@ngrx/store';
import { loadDiarys, fetchDiarys, loadPosts, fetchPosts} from './store.actions';

export const initialState = {
    diarys: { p: [], d: [] },
    posts: { p: [], r: [] }
};

export const storeReducer = createReducer(
    initialState,
    on(loadDiarys, (state, data) => {
        return {...state, diarys: data.payload}
    }), 
    on(loadPosts, (state, data) => {
        return {...state, posts: data.payload}
    }),

);