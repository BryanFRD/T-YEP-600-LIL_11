import { User } from './user.type'

export type AuthLogin = {
  identifier: string,
  password: string,
}

export type AuthRegister = {
  username: string,
  email: string,
  password: string,
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const LOGOUT = 'LOGOUT'

interface LoginRequestionAction {
  type: typeof LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  user: User
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE,
  error: string
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE,
  error: string
}

interface LogoutAction {
  type: typeof LOGOUT
}

export type AuthActionTypes = 
  | LoginRequestionAction 
  | LoginSuccessAction 
  | LoginFailureAction 
  | RegisterRequestAction 
  | RegisterSuccessAction 
  | RegisterFailureAction 
  | LogoutAction;