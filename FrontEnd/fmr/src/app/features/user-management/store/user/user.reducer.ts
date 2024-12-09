import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, { ...state })
  ),
  on(UserActions.addUser, (state, { user }) =>
    userAdapter.upsertOne(user, state)
  ),
  on(UserActions.updateUser, (state, { user }) =>
    userAdapter.updateOne({ id: user.id, changes: user }, state)
  ),
  on(UserActions.deleteUser, (state, { id }) =>
    userAdapter.removeOne(id, state)
  ),
  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  }))
);
