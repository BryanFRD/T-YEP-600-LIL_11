import { createContext, PropsWithChildren, useState } from 'react'

import logger from '../logger/logger'

export interface UserContextValue {
  login: (user: Partial<User>) => void
  register: (user: Partial<User>) => void
  update: (user: Partial<User>) => void
  refresh: () => void
  disconnect: () => void
  user: User | null
}

export interface User {
  id: string
  username: string
  firstname: string
  name: string
  email: string
  password?: string
  identifier?: string
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

  const login = (user: Partial<User>) => {
    logger.debug('login:', user.username, user.email)
    // TODO: Faire une requête pour connecter l'utilisateur
    setUser(user as User)
  }

  const register = (user: Partial<User>) => {
    logger.debug('register:', user.username, user.email)
    // TODO: Faire une requête pour créer un nouvel utilisateur
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
    // TODO: Faire une requête pour déconnecter l'utilisateur
    setUser(null)
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
