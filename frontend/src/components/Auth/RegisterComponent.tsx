import {
  faEnvelope,
  faLock,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthImplementation from '../../service/impl/auth.implementation';
import logger from '../../logger/logger';

const RegisterComponent: React.FC = () => {
  const service = new AuthImplementation();
  const [formData, setFormData] = useState({
    firstname: '',
    name: '',
    email: '',
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    toast.promise(
      service
        .register(formData)
        .then((res) => {
          if (res) {
            navigate('/login', { replace: true });
          }
        })
        .catch(err => {
          logger.error(err);
          throw err;
        }),
      {
        pending: 'Inscription en cours...',
        success: 'Inscription réussie 👌',
        error: 'Erreur lors de l\'inscription 🤯'
      }
    )
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animatedBackground blur-sm absolute w-full h-full"></div>
      <div className="relative w-full max-w-md p-8 space-y-16 rounded-md bg-white bg-opacity-80">
        <h1 className="text-3xl font-bold text-center">Créer un compte</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Pseudo"
              value={formData.username}
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
            S'inscrire
          </button>
        </form>
        <div className="flex justify-center">
          <a href="/login" className="text-cyan-500 hover:underline">
            Déjà un compte ? Connectez-vous
          </a>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent
