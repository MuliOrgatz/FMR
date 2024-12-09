import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../../features/user-management/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private mockUsers: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'David' },
    { id: 4, name: 'Ron' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(1000)); //Mock API call
  }
}
