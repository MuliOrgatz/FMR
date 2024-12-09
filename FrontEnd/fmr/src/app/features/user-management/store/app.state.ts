import { UserState } from './user/user.state';
import { OrderState } from './order/order.state';

export interface AppState {
  users: UserState;
  orders: OrderState;
}
