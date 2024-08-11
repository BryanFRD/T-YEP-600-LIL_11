import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import routes from './config.routes'

const Router = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentRoute = routes.find(route => route.path === window.location.pathname);
    
    
    if(!user && currentRoute?.requiresAuth)
      navigate('/login')
  }, [user, navigate]);

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
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
      </Routes>
  )
}

export default Router
