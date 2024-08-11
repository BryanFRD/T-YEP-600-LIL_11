import { Dispatch } from '@reduxjs/toolkit';
import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  AuthActionTypes,
  AuthLogin,
} from '../types/auth.type';
import { User } from '../types/user.type';
import AuthImplementation from '../service/impl/auth.implementation';
import UserImplementation from '../service/impl/user.implementation';

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user: User): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

export const registerRequest = (): AuthActionTypes => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (): AuthActionTypes => ({
  type: REGISTER_SUCCESS
});

export const registerFailure = (error: string): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  error,
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

export const login = (auth: AuthLogin) => {
  const authImplementation = new AuthImplementation();
  
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(loginRequest());
    const response = await authImplementation.login(auth);
    if (response) {
      const userImplementation = new UserImplementation();
      const users = await userImplementation.getCurrentUser();
      
      dispatch(loginSuccess(response.user));
    } else {
      dispatch(loginFailure('Login failed'));
    }
}