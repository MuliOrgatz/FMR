import { createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { AppState } from '../app.state';
import { User } from '../../models/user.model';

export const selectUserState = (state: AppState) => state.users;

export const selectUserEntities = createSelector(
  selectUserState,
  (state: UserState) => state.entities
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedUserId): User | null => {
    return selectedUserId !== null ? entities[selectedUserId] : null;
  }
);
