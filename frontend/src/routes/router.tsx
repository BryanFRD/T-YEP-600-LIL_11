import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import AuthImplementation from '../service/impl/auth.implementation'
import UserImplementation from '../service/impl/user.implementation'
import { User } from '../types/user.type'
import routes, { RouteType } from './config.routes'

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteType | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentRoute(
      routes.find(route => route.path === window.location.pathname) ?? null
    )

    const authImplementation = new AuthImplementation()

    const fetchUser = async () => {
      const user = await authImplementation.me()

      if (user) setUser(user)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (!user && currentRoute?.requiresAuth) navigate('/login')
  }, [user, navigate, currentRoute])

  return (
    <Routes>
      {routes
        .filter(({ requiresGuest, requiresAuth, requiresAdmin }) => {
          if (requiresGuest && user) return false
          if (requiresAuth && !user) return false
          if (requiresAdmin) return false

          return true
        })
        .map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
    </Routes>
  )
}

export default Router
