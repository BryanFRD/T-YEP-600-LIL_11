import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuthImplementation from '../../service/impl/auth.implementation'
import logger from '../../logger/logger'

const LoginComponent: React.FC = () => {
  const service = new AuthImplementation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      identifier: formData.emailOrUsername,
      password: formData.password
    }
    toast.promise(
      service
        .login(body)
        .then((res) => {
          console.log(res)
          if (res) {
            navigate('/', { replace: true });
          } else {
            throw new Error('Identifiant ou mot de passe incorrect');
          }
        })
        .catch(err => {
          logger.error(err);
          throw err;
        }),
      {
        pending: 'Connexion en cours...',
        success: 'Connexion réussie 👌',
        error: 'Identifiant ou mot de passe incorrect 🤯'
      }
    )
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animatedBackground blur-sm absolute w-full h-full"></div>
      <div className="relative w-full max-w-md p-8 space-y-16 rounded-md bg-white bg-opacity-80">
        <h1 className="text-3xl font-bold text-center">Jouer à Raptor Fight</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Identifiant (email ou pseudo)"
              value={formData.emailOrUsername}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Connexion
          </button>
        </form>
        <div className="flex justify-between">
          <a
            href="/register"
            className="text-cyan-500 hover:underline underline-offset-2"
          >
            Créer un compte
          </a>
          <a
            href="/forgot-password"
            className="text-cyan-500 hover:underline underline-offset-2"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
