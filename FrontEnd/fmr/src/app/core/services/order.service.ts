import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Order } from '../../features/user-management/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private mockOrders: Order[] = [
    { id: 1, userId: 1, total: 100 },
    { id: 2, userId: 1, total: 700 },
    { id: 3, userId: 2, total: 300 },
    { id: 4, userId: 3, total: 200 },
    { id: 5, userId: 3, total: 200 },
    { id: 6, userId: 4, total: 900 },
  ];

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(1000)); //Mock API call
  }
}
