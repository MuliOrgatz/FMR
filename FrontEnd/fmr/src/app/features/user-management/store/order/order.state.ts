import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../models/order.model';

export interface OrderState extends Omit<EntityState<Order>, 'entities'> {
  entities: { [id: number]: Order };
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order) => order.id,
});

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  entities: {} as { [id: number]: Order },
});
