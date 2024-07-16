import { createContext, PropsWithChildren, useContext, useState } from 'react'

import logger from '../logger/logger'
import ServerContext from './ServerContext'
import ServerEvent from '../enum/ServerEvent'

export interface UserContextValue {
  login: (login: string, password: string) => void
  register: (username: string, email: string, password: string) => void
  update: (user: Partial<User>) => void
  refresh: () => void
  disconnect: () => void
  user: User | null
}

export interface User {
  token: string
  id: string
  username: string
  email: string
}

const initialContextValue: UserContextValue = {
  login: () => {},
  register: () => {},
  update: () => {},
  refresh: () => {},
  disconnect: () => {},
  user: null
}

const UserContext = createContext<UserContextValue>(initialContextValue)

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null)
  const {emit, addEventHandler, removeEventHandler} = useContext(ServerContext)

  const login = (login: string, password: string) => {
    logger.debug('login:', login, password)
    
    emit(ServerEvent.CONNECT, {login, password})
  }

  const register = (username: string, email: string, password: string) => {
    logger.debug('register:', username, email, password)
    
    emit(ServerEvent.REGISTER, {username, email, password})
  }

  const update = (user: Partial<User>) => {
    logger.debug('update:', user)
    // TODO: Faire une requête pour mettre à jour les informations de l'utilisateur
    setUser(u => {
      if (!u) return null
      return { ...u, ...user }
    })
  }

  const refresh = () => {
    logger.debug('refresh')
    // TODO: Faire une requête pour rafraîchir les informations de l'utilisateur
  }

  const disconnect = () => {
    logger.info('disconnect')
    
    if(user !== null) {
      emit(ServerEvent.DISCONNECT, { token: user.token })
    }
  }

  return (
    <UserContext.Provider
      value={{ login, register, update, refresh, disconnect, user }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
