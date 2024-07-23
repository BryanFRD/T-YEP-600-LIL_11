import { useContext } from 'react'
import { BrowserRouter as ReactRouter, Route, Routes } from 'react-router-dom'

import UserContext from '../context/UserContext'
import routes from './config.routes'

const Router = () => {
  const { user } = useContext(UserContext)

  return (
    <ReactRouter>
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
    </ReactRouter>
  )
}

export default Router
