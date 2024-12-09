import { createReducer, on } from '@ngrx/store';
import { orderAdapter, initialOrderState, OrderState } from './order.state';
import * as OrderActions from './order.actions';

export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.loadOrdersSuccess, (state, { orders }) =>
    orderAdapter.setAll(orders, state)
  ),
  on(OrderActions.addOrder, (state, { order }) =>
    orderAdapter.upsertOne(order, state)
  ),
  on(OrderActions.updateOrder, (state, { order }) =>
    orderAdapter.updateOne({ id: order.id, changes: order }, state)
  ),
  on(OrderActions.deleteOrder, (state, { id }) =>
    orderAdapter.removeOne(id, state)
  )
);
