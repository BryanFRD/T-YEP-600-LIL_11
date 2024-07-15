import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './components/Auth/loginPage'
import SigninPage from './components/Auth/signinPage'
import PhaserGame from './game'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PhaserGame />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <SigninPage />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
