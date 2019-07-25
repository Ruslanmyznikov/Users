  import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import *  as fromUser from './user.reducer'
import { environment } from '../../../environments/environment';

export interface State {
  users : fromUser.State
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
