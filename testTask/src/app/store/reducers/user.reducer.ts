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
    let newState = JSON.parse(JSON.stringify(state));
    newState.users.forEach((element, index) => {
      if (element._id === user._id) {
        newState.users[index] = user;
      }
    })
    return newState
  }),
  on(UserPageActions.setUsers, (state, data) => {
    return {users: [...data.users]}
  }),
  on(UserPageActions.createUser, (state, user) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.users.push(user)
    return newState
  }),
  on(UserPageActions.killUser, (state, user) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.users.forEach((element, index) => {
      if (element._id === user._id) {
        newState.users.splice(index, 1);
      }
    })
    return newState
  }) 
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}