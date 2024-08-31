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
  AuthRegister,
} from '../types/auth.type';
import { User } from '../types/user.type';
import AuthImplementation from '../service/impl/auth.implementation';
import UserImplementation from '../service/impl/user.implementation';
import logger from '../logger/logger';

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

export const performLogin = (auth: AuthLogin) => {
  const authImplementation = new AuthImplementation();
  
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(loginRequest());
    const response = await authImplementation.login(auth);
    
    logger.info('Login response:', response);
    
    if (response) {
      const authImplementation = new AuthImplementation();
      const user = authImplementation.me();
      
      if (user) {
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure('Login failed'));
      }
    } else {
      dispatch(loginFailure('Login failed'));
    }
  }
  
}

export const register = (auth: AuthRegister) => {
  const authImplementation = new AuthImplementation();
  
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(registerRequest());
    const response = await authImplementation.register(auth);
    
    logger.info('Register response:', response);
    
    if (response) {
      dispatch(registerSuccess());
    } else {
      dispatch(registerFailure('Register failed'));
    }
  }
}

export const performLogout = () => {
  const authImplementation = new AuthImplementation();
  
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    const response = await authImplementation.logout();
    
    logger.info('Logout response:', response);
    
    if (response) {
      dispatch(logout());
    } else {
      dispatch(loginFailure('Logout failed'));
    }
  }
}