import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import {
  selectSelectedUser,
  selectUserEntities,
} from '../../store/user/user.selectors';
import { Order } from '../../models/order.model';
import { selectOrdersForSelectedUser } from '../../store/order/order.selectors';
import { AppState } from '../../store/app.state';
import { map } from 'rxjs/operators';
import * as UserActions from '../../store/user/user.actions';
import * as OrderActions from '../../store/order/order.actions';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
})
export class UserOrdersComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  userOrders$: Observable<Order[]>;
  totalOrders$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.users$ = this.store
      .select(selectUserEntities)
      .pipe(map((entities) => Object.values(entities)));
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.userOrders$ = this.store.select(selectOrdersForSelectedUser);
    this.totalOrders$ = this.userOrders$.pipe(
      map((orders: Order[]) =>
        orders.reduce((sum, order) => sum + order.total, 0)
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.store.dispatch(OrderActions.loadOrders());
  }

  onSelectUser(event: Event): void {
    const userId = (event.target as HTMLSelectElement).value;
    if (userId) {
      this.store.dispatch(UserActions.selectUser({ userId: +userId }));
    }
  }
}
