import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { OrderState } from './order.state';
import { Order } from '../../models/order.model';

export const selectOrderState = (state: AppState) => state.orders;

export const selectOrderEntities = createSelector(
  selectOrderState,
  (state: OrderState) => state.entities
);

export const selectOrdersForSelectedUser = createSelector(
  selectOrderEntities,
  (state: AppState) => state.users.selectedUserId,
  (entities, selectedUserId): Order[] => {
    if (!selectedUserId) {
      return [];
    }
    return Object.values(entities).filter(
      (order) => order.userId === selectedUserId
    );
  }
);
