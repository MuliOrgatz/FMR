import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User API] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
export const addUser = createAction(
  '[User API] Add User',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[User] Add Users Success',
  props<{ user: User }>()
);
export const addUsersFailure = createAction(
  '[User] Add Users Failure',
  props<{ error: any }>()
);
export const updateUser = createAction(
  '[User API] Update User',
  props<{ user: User }>()
);
export const deleteUser = createAction(
  '[User API] Delete User',
  props<{ id: number }>()
);
export const selectUser = createAction(
  '[User] Select User',
  props<{ userId: number }>()
);
