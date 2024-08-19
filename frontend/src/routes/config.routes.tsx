import LoginComponent from '../components/Auth/LoginComponent'
import RegisterComponent from '../components/Auth/RegisterComponent'
import Home from '../view/Home'

export type RouteType = {
  path: string
  component: React.FC
  requiresGuest?: boolean
  requiresAuth?: boolean
  requiresAdmin?: boolean
}

const routes: RouteType[] = [
  {
    path: '/',
    component: Home,
    requiresAuth: true
  },
  {
    path: '/login',
    component: LoginComponent,
    requiresGuest: true
  },
  {
    path: '/register',
    component: RegisterComponent,
    requiresGuest: true
  }
]

export default routes
