import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/user.model';

export interface UserState extends EntityState<User> {
  entities: { [id: number]: User };
  selectedUserId: number | null;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const initialUserState: UserState = userAdapter.getInitialState({
  entities: {} as { [id: number]: User },
  selectedUserId: null,
});
