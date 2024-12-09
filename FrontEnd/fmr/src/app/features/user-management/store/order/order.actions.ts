import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

export const loadOrders = createAction('[Order API] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Order API] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction('[Order API] Load Orders Failed');
export const addOrder = createAction(
  '[Order API] Add Order',
  props<{ order: Order }>()
);
export const updateOrder = createAction(
  '[Order API] Update Order',
  props<{ order: Order }>()
);
export const deleteOrder = createAction(
  '[Order API] Delete Order',
  props<{ id: number }>()
);
