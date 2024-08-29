import LoginComponent from '../components/Auth/LoginComponent'
import RegisterComponent from '../components/Auth/RegisterComponent'
import Home from '../view/Home'
import NotFound from '../view/NotFound'

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
    requiresAuth: false
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
  },
  {
    path: '*',
    component: NotFound
  }
]

export default routes
