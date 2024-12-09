import { Routes } from '@angular/router';
import { UserOrdersComponent } from './features/user-management/components/user-orders/user-orders.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './features/user-management/store/user/user.effects';
import { HomeComponent } from './features/home/home.component';
import { userReducer } from './features/user-management/store/user/user.reducer';
import { orderReducer } from './features/user-management/store/order/order.reducer';
import { OrderEffects } from './features/user-management/store/order/order.effects';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'user-orders',
    component: UserOrdersComponent,
    providers: [
      provideState({ name: 'users', reducer: userReducer }),
      provideState({ name: 'orders', reducer: orderReducer }),
      provideEffects(UserEffects, OrderEffects),
    ],
  },
];
