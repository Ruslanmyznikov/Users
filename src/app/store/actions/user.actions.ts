import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUsers = createAction('[User List] Add', props< {users: User[]} >())
export const editUser = createAction('[User Detail] Edit',  props< User >());
export const createUser = createAction('[User Detail] Create',  props< User >());
export const killUser = createAction('[User Detail] Remove',  props< User >());