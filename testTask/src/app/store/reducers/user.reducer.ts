import { Action, createReducer, on } from '@ngrx/store';
import  *  as UserPageActions from '../actions/user.actions';
import { User } from 'src/app/models/user.model';

export interface State {
  users: User[]
}

export const initialState: State  = {
  users: []
};

export const userReducer = createReducer(initialState,
  on(UserPageActions.editUser, (state, user) => {
    let arr = state.users
    arr.push(user)
    return {users: arr}
  }),
  on(UserPageActions.setUsers, (state, data) => {
    return {users: [...data.users]}
  }) 
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}