import { ActionType } from 'typesafe-actions';

import { LOGIN_USER, LOGOUT } from '../constants';
import { User } from '../../interfaces';

export interface LoginAction {
  type: typeof LOGIN_USER;
  payload: User;
}

export function login(user: User): LoginAction {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}

export type AuthActions = ActionType<typeof login | typeof logout>;
