import { replacer } from 'mathjs'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import instance from '../api/axios.config'
import logger from '../logger/logger'
import AuthImplementation from '../service/impl/auth.implementation'

export interface UserContextValue {
  login: (user: Partial<User>) => Promise<boolean>
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
  login: async (_userLogin: Partial<User>) => false,
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
  const [authService] = useState<AuthImplementation>(new AuthImplementation())
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (userLogin: Partial<User>) => {
    const response = await authService.login(userLogin) 
    if (!response) return false
    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.data.access_token)
      const payloadString = response.data.data.access_token.split('.')[1]
      const decoded = atob(payloadString)
      const payload = JSON.parse(decoded)
      setUser(payload.user)
      return true
    }     
    return false
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

  const refresh = async () => {
    setLoading(true)
    return await authService.getMe().then((res) => {
      if (res?.status === 200) {
        setUser(res.data.data)
      }
      setLoading(false)
    })
  }

  const disconnect = () => {
    logger.info('disconnect')
    // TODO: Faire une requête pour déconnecter l'utilisateur
    setUser(null)
  }

  // refresh user on mount
  useEffect(() => {
    refresh()   
  }, [])

  return (
    <UserContext.Provider
      value={{ login, register, update, refresh, disconnect, user }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
