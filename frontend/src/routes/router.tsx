import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import AuthImplementation from '../service/impl/auth.implementation'
import { User } from '../types/user.type'
import routes, { RouteType } from './config.routes'
import Server from '../server/Server'

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteType | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentRoute(
      routes.find(route => route.path === window.location.pathname) ?? null
    )

    const authImplementation = new AuthImplementation()

    const fetchUser = async () => {
      const user = await authImplementation.me()

      if (user){
        Server.getInstance().setUserData(user);
        setUser(user);
      }
      
      setLoading(false)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if(loading) return;
    
    if (!user && currentRoute?.requiresAuth) navigate('/login')
  }, [user, navigate, currentRoute, loading])

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
