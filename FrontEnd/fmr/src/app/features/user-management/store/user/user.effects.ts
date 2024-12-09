import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../../../core/services/user.service';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: User[]) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => {
            console.error('Error loading users', error);
            return of({ type: '[User] Load Users Failure' });
          })
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap(({ user }) =>
        of(user).pipe(
          map((newUser: User) => {
            return UserActions.addUserSuccess({ user: newUser });
          }),
          catchError((error) => {
            console.error('Error adding user', error);
            return of({ type: '[User] Add User Failure' });
          })
        )
      )
    )
  );
}
