import { createReducer, on } from '@ngrx/store';
import { loading, loadDiarys, loadPosts, loadPost, SetUser} from './store.actions';

export const initialState = {
    diarys: { p: [], d: [] },
    posts: { p: [], r: [] },
    user: { },
    cPost: { },
    loading: false
};

export const storeReducer = createReducer(
    initialState,
    on(loadDiarys, (state, data) => {
        return {...state, diarys: data.payload}
    }), 
    on(loadPosts, (state, data) => {
        return {...state, posts: data.payload}
    }),
    on(SetUser, (state, data) => {
        return {...state, user: data}
    }),
    on(loadPost, (state, data) => {
        return {...state, cPost: data.payload}
    }),
    on(loading, (state, data) => {
        return {...state, loading: data.payload}
    }),

);