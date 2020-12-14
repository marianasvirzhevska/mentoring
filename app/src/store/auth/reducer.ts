import { User } from '../../interfaces';
import { LOGIN_USER, LOGOUT } from '../constants';
import { AuthActions } from './actions';

export interface AuthState {
  auth: boolean;
  user: User | null;
}

const initialState: AuthState = {
  auth: false,
  user: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        auth: false,
        user: null,
      };

    default:
      return state;
  }
};
